HOME_DIR="."
if (( "$#" == 1 ))
then
  HOME_DIR=$1
fi

echo -e "\nIgnore any 404 errors. If this is the first time running script then there are no existing indexes to delete"
sleep 2

echo -e "\nloading mapping: murmuration_region"
curl -XDELETE 'http://localhost:9200/murmuration_region/'
curl -XPUT 'http://localhost:9200/murmuration_region' -d @$HOME_DIR/region.json --header "Content-Type: application/json"

echo -e "\nloading mapping: murmuration_target"
curl -XDELETE 'http://localhost:9200/murmuration_target/'
curl -XPUT 'http://localhost:9200/murmuration_target' -d @$HOME_DIR/target.json --header "Content-Type: application/json"

echo -e "\nloading mapping: murmuration_objective"
curl -XDELETE 'http://localhost:9200/murmuration_objective/'
curl -XPUT 'http://localhost:9200/murmuration_objective' -d @$HOME_DIR/objective.json --header "Content-Type: application/json"

echo -e "\nloading mapping: murmuration_resource"
curl -XDELETE 'http://localhost:9200/murmuration_resource/'
curl -XPUT 'http://localhost:9200/murmuration_resource' -d @$HOME_DIR/resource.json --header "Content-Type: application/json"

echo -e "\nloading mapping: murmuration_patrol"
curl -XDELETE 'http://localhost:9200/murmuration_patrol/'
curl -XPUT 'http://localhost:9200/murmuration_patrol' -d @$HOME_DIR/patrol.json --header "Content-Type: application/json"

echo -e "\n\nView all indexes: http://localhost:9200/_cat/indices"
echo -e "View murmuration_objective index mapping: http://localhost:9200/murmuration_objective/_mapping?pretty=true"
echo -e "View murmuration_objective index first 10 documents: http://localhost:9200/murmuration_objective/_search?pretty=true"