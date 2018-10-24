files=$(ls test/*)
for filename in $files
do
  node $filename
done
