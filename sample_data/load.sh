echo -e "\nRemove any cruft, delete and reload indexes"
../mappings/load_mappings.sh ../mappings

echo -e "\nLoading region sample data"
curl -XPOST 'localhost:9200/murmuration_region/region/_bulk?pretty' --data-binary "@regions.json"

echo -e "\nLoading target sample data"
curl -XPOST 'localhost:9200/murmuration_target/target/_bulk?pretty' --data-binary "@targets.json"

echo -e "\nLoading objective sample data"
curl -XPOST 'localhost:9200/murmuration_objective/objective/_bulk?pretty' --data-binary "@objectives.json"

echo -e "\nLoading resource sample data"
curl -XPOST 'localhost:9200/murmuration_resource/resource/_bulk?pretty' --data-binary "@resources.json"

echo -e "\nLoading patrol sample data"
curl -XPOST 'localhost:9200/murmuration_patrol/patrol/_bulk?pretty' --data-binary "@patrols.json"
