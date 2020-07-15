{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TypeApplications #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE LambdaCase #-}
{-# OPTIONS_GHC -fno-warn-orphans #-}
module Main where
import Test.Hspec
import Test.Hspec.SmallCheck
import Test.Tasty
import Test.Tasty.Golden
import Test.Tasty.Hspec
import Test.SmallCheck.Series

import qualified Data.Text as T
import qualified Data.Text.Encoding as TE
import qualified Data.Text.IO as TIO
import qualified Data.ByteString.Lazy as LB
import Data.Functor.Identity
import Data.List (isInfixOf, (\\))
import Data.Proxy
import Data.Typeable
import System.Directory
import System.FilePath
import Control.Exception
import Control.DeepSeq
import System.Process
import System.Exit
import Generics.Deriving
import Data.Text(pack, unpack, replace)
import GHC.IO.Handle
import Crypto.Hash

import Reach.ParserInternal
import Reach.Compiler (CompileErr, compile)
import Reach.CompilerTool
import Reach.Util

import Language.JavaScript.Parser.SrcLocation
instance NFData TP where
  rnf (TP _) = ()
instance NFData TokenPosn where
  rnf (TokenPn _ _ _) = ()

class (Generic a, Typeable a, ConNames (Rep a), Serial Identity a) => ReachErr a
instance ReachErr ParseErr
instance ReachErr CompileErr

mustExist :: FilePath -> Expectation
mustExist fp = do
  e <- doesPathExist fp
  if e then
    True `shouldBe` True
  else
    expectationFailure $ "file does not exist: " ++ fp

try_hard :: NFData a => Exception e => IO a -> IO (Either e a)
try_hard m = do
  one <- try m
  case one of
    Left _ -> return one
    Right p -> try $ evaluate $ force p

hashit :: String -> String
hashit xs = show h
  where xb = bpack xs
        h :: Digest MD5
        h = hash xb

-- This is really hacky
stripParenthetical :: String -> String
stripParenthetical s = case "(given" `isInfixOf` s of
    True -> (<> "\n") $ reverse $ drop 1 $ reverse $ takeWhile (/= '(') s
    False -> s

dropDefines :: [String] -> [String]
dropDefines = filter (\line -> not $ "(define" `isInfixOf` line)

err_m :: Show a => NFData a => String -> FilePath -> IO a -> Expectation
err_m msg expected_p comp = do
  mustExist expected_p
  expected <- readFile expected_p
  actual_r <- try_hard $ comp
  case actual_r of
    Right r ->
      expectationFailure $ "expected a failure for " ++ msg ++ " but, got: " ++ show r
    Left (ErrorCall actual_x) ->
      if length actual < 1000
      then actual_noParen `shouldBe` expected_noParen
      else do
        -- Instead of comparing expected/actual directly, we squint a little.
        -- z3 defines are allowed to differ, as long as the errs are the same.
        -- This allows the tests to pass across different versions of z3
        actual' `shouldBe` expected'
        -- z3 4.4.1 has a different # of defines =[
        -- length actualLines `shouldBe` length expectedLines
      where actual = (actual_x ++ "\n")
            actual_noParen = stripParenthetical actual
            expected_noParen = stripParenthetical expected
            actualLines = lines actual
            expectedLines = lines expected
            actual' = dropDefines actualLines
            expected' = dropDefines expectedLines

err_example :: Show a => NFData a => String -> (FilePath -> IO a) -> Expectation
err_example which f = do
  let expth ext = "test.rsh/" ++ which ++ "." ++ ext
  let expected_p = expth "txt"
  let actual_p = expth "rsh"
  mustExist actual_p
  err_m which expected_p (f actual_p)

parse_err_example :: ParseErr -> Expectation
parse_err_example pe =
  err_example (conNameOf pe) readReachFile

test_compile :: FilePath -> IO ()
test_compile n = do
  opts <- makeCompilerOpts $ CompilerToolOpts
    { cto_outputDir = "test.out"
    , cto_source = n
    , cto_expCon = False
    , cto_expComp = False
    }
  compile opts

compile_err_example :: CompileErr -> Expectation
compile_err_example ce =
  err_example (conNameOf ce) test_compile


patch_and_compile :: FilePath -> FilePath -> IO ()
patch_and_compile dir pf = do
  let examples_dir = "../examples"
  let dest = unpack . replace "__" "/" . pack $ pf
  let orig = dropExtension dest
  let patchCmd = "patch -d " ++ examples_dir ++ " -i " ++ (".." </> "hs" </> dir </> pf) ++ " -o " ++ dest ++ " " ++ orig
  putStrLn patchCmd
  ExitSuccess <- system patchCmd
  putStrLn "...patch applied"
  let rdest = examples_dir </> dest
  putStrLn "compiling..."
  (_, Just hout, Just herr, hP) <-
    createProcess (proc "stack" ["exec", "--", "reachc", "-o", "test.out", rdest]){ std_out = CreatePipe,
                                                                                    std_err = CreatePipe }
  out <- hGetContents hout
  err <- hGetContents herr
  putStrLn $ "...finished: " ++ show (length out)
  _ <- waitForProcess hP
  removeFile rdest
  let tag t x = "<" ++ t ++ ">\n" ++ x ++ "\n</" ++ t ++ ">\n"
  let res = (tag "out" out) ++ (tag "err" err)
  writeFile (dir </> pf <.> "actual") (res ++ "\n")
  error res

verify_regress1 :: FilePath -> FilePath -> Spec
verify_regress1 dir pf = do
  it ("verify_regress " ++ pf) $ do
    err_m pf (dir </> pf <.> "out") (patch_and_compile dir pf)

notDotOut :: FilePath -> Bool
notDotOut fp = ext /= ".out" && ext /= ".actual"
  where ext = (takeExtension fp)

verify_regress :: FilePath -> Spec
verify_regress dir = do
  fs <- runIO $ listDirectory dir
  let ps = filter notDotOut fs
  mapM_ (verify_regress1 dir) ps

errExampleBs :: (Show a, NFData a) => (FilePath -> IO a) -> FilePath -> IO LB.ByteString
errExampleBs k fp = withCurrentDirectory dir (try_hard (k fpRel)) >>= \case
  Right r ->
    fail $ "expected a failure, but got: " ++ show r
  Left (ErrorCall e) ->
    return $ LB.fromStrict $ bpack e
  where
    dir = takeDirectory fp
    fpRel = takeFileName fp

errExample :: (Show a, NFData a) => String -> (FilePath -> IO a) -> FilePath -> TestTree
errExample ext k fp = do
  let goldenFile = replaceExtension fp ext
      fpBase = takeBaseName fp
  goldenVsString fpBase goldenFile (errExampleBs k fp)

test_compile_vererr :: FilePath -> IO (LB.ByteString, LB.ByteString)
test_compile_vererr pf = do
  let examples_dir = "../examples"
  let dest = unpack . replace "__" "/" . pack $ takeFileName pf
  let orig = dropExtension $ dropExtension dest
  let patchCmd = "patch --quiet -d " ++ examples_dir ++ " -i " ++ pf ++ " -o " ++ dest ++ " " ++ orig
  -- putStrLn patchCmd
  ExitSuccess <- system patchCmd
  -- putStrLn "...patch applied"
  let rdest = examples_dir </> dest
  -- putStrLn "compiling..."
  (_, Just hout, Just herr, hP) <-
    createProcess (proc "stack" ["exec", "--", "reachc", "-o", "test.out", rdest]){ std_out = CreatePipe,
                                                                                    std_err = CreatePipe }
  outT <- TIO.hGetContents hout
  err <- LB.hGetContents herr
  -- strip out the defines
  let outT' = T.unlines $ filter (\line -> not $ "(define" `T.isInfixOf` line) $ T.lines outT
  let out = LB.fromStrict $ TE.encodeUtf8 outT'
  -- putStrLn $ "...finished: " ++ show (LB.length out)
  _ <- waitForProcess hP
  removeFile rdest
  return (out, err)


stderroutExampleBs :: (FilePath -> IO (LB.ByteString, LB.ByteString)) -> FilePath -> IO LB.ByteString
stderroutExampleBs k fp = do
  (out, err) <- k fp
  let tag t x = "<" <> t <> ">\n" <> x <> "\n</" <> t <> ">\n"
  let res = (tag "out" out) <> (tag "err" err)
  return res


stderroutExample :: String -> (FilePath -> IO (LB.ByteString, LB.ByteString)) -> FilePath -> TestTree
stderroutExample ext k fp = do
  let goldenFile = replaceExtension fp ext
      fpBase = takeBaseName fp
  goldenVsString fpBase goldenFile (stderroutExampleBs k fp)

parseErrExample :: FilePath -> TestTree
parseErrExample = errExample ".txt" readReachFile

compileErrExample :: FilePath -> TestTree
compileErrExample = errExample ".txt" test_compile

verifyErrExample :: FilePath -> TestTree
verifyErrExample = stderroutExample ".out" test_compile_vererr


-- It is dumb that both testSpec and it require descriptive strings
testNotEmpty :: String -> [a] -> IO TestTree
testNotEmpty label xs = testSpec label $ it "is not empty" $ case xs of
  [] -> expectationFailure "... it is empty =["
  (_:_) -> pure ()

testExamplesCover ::
  forall err proxy. (ReachErr err) =>
  proxy err -> [FilePath] -> IO TestTree
testExamplesCover p sources = testSpec label t where
    label = "Examples covering " <> ty
    ty = show $ typeRep p
    constrs = listSeries 1 :: [err]
    cNames = map conNameOf constrs
    t = it "list of constructors with missing examples is empty" $ do
      let missing = cNames \\ map takeBaseName sources
      missing `shouldBe` []

testsFor :: ReachErr err =>
  proxy err -> (FilePath -> TestTree) -> String -> FilePath -> IO TestTree
testsFor p mkTest ext subdir = do
  (sources, gTests) <- goldenTests' mkTest ext subdir
  testCov <- testExamplesCover p sources
  let groupLabel = subdir
  let tests = testCov : gTests
  return $ testGroup groupLabel tests

goldenTests' :: (FilePath -> TestTree) -> String -> FilePath -> IO ([FilePath], [TestTree])
goldenTests' mkTest ext subdir = do
  curDir <- getCurrentDirectory
  let dir = curDir </> "test-examples" </> subdir
  sources <- findByExtension [ext] dir
  testNe <- testNotEmpty "this subdir" sources
  let testSources = testGroup ("testing each " <> ext <> "file") $ map mkTest sources
  let tests = [testNe, testSources]
  return (sources, tests)

goldenTests :: (FilePath -> TestTree) -> String -> FilePath -> IO TestTree
goldenTests mkTest ext subdir = do
  (_, gTests) <- goldenTests' mkTest ext subdir
  let groupLabel = subdir
  return $ testGroup groupLabel gTests

main :: IO ()
main = do
  parseTests <- testsFor (Proxy @ParseErr) parseErrExample ".rsh" "parse-errors"
  compileTests <- testsFor (Proxy @CompileErr) compileErrExample ".rsh" "compile-errors"
  verifyTests <- goldenTests verifyErrExample ".patch" "verification-errors"
  defaultMain $ testGroup "tests"
    [ parseTests
    , compileTests
    , verifyTests
    ]

-- XXX copy verification tests over and delete dead code
main' :: IO ()
main' = hspec $ do
  describe "Parser" $ do
    it "stdlib_defs is valid" $ do
      stdlib_defs >>= (`shouldSatisfy` (not . null))
    it "all parse errs have examples" $ property $
      parse_err_example
  describe "Compiler" $ do
    it "all compile errs have examples" $ property $
      compile_err_example
  describe "Verification Regression" $ do
    verify_regress "test.patch"
