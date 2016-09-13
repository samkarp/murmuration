echo -e "\nIgnore any 404 errors. If this is the first time running script then there are no existing indexes to delete"
sleep 2

echo -e "\nloading mapping: murmuration_region"
curl -XDELETE 'http://localhost:9200/murmuration_region/'
curl -XPUT 'http://localhost:9200/murmuration_region' -d @region.json --header "Content-Type: application/json"

echo -e "\nloading mapping: murmuration_target"
curl -XDELETE 'http://localhost:9200/murmuration_target/'
curl -XPUT 'http://localhost:9200/murmuration_target' -d @target.json --header "Content-Type: application/json"

echo -e "\nloading mapping: murmuration_objective"
curl -XDELETE 'http://localhost:9200/murmuration_objective/'
curl -XPUT 'http://localhost:9200/murmuration_objective' -d @objective.json --header "Content-Type: application/json"

echo -e "\nloading mapping: murmuration_resource"
curl -XDELETE 'http://localhost:9200/murmuration_resource/'
curl -XPUT 'http://localhost:9200/murmuration_resource' -d @resource.json --header "Content-Type: application/json"

echo -e "\nloading mapping: murmuration_patrol"
curl -XDELETE 'http://localhost:9200/murmuration_patrol/'
curl -XPUT 'http://localhost:9200/murmuration_patrol' -d @patrol.json --header "Content-Type: application/json"

echo -e "\n\nView all indexes: http://localhost:9200/_cat/indices"
echo -e "View murmuration_objective index mapping: http://localhost:9200/murmuration_objective/_mapping?pretty=true"
echo -e "View murmuration_objective index first 10 documents: http://localhost:9200/murmuration_objective/_search?pretty=true"