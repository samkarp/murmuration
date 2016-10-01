# Murmuration
Murmuration is a web application designed to provide visibility and insight into resource allocation against prioritized objectives.

## Getting started

### Setting up Elasticsearch
* Install latest Java 8
* Download and install lastest elasticsearch 2.x version
* Configure elasticsearch for CORS. Add the following to `$ELASTICSSEARCH_HOME/config/elasticsearch.yml`
```
 http.cors.enabled: true
 http.cors.allow-origin: '*'
 http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
 http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
```
* Start elasticsearch. `$ELASTICSSEARCH_HOME/bin/elasticsearch`
* Load Elasticsearch mappings. `$MURMURATION_HOME/mappings/load_mappings.sh`

### Loading sample data
* Run the script `$MURMURATION_HOME/sample_data/load.sh`

## Web API
Elasticsearch's REST API will be the web API until murmuration outgrowns this simple implemenation

## Running the ReactJS App
* Go to the `$MURMURATION_HOME` directory
* Run the `npm install` command from there (NOTE: It takes a long time)
* Run `npm start`
* That should complete running then open a browser window to the correct URL

## Data types

### resource
An ssset with particular skillsets that are deployed against objectives.

```
  id - string
  name - string
  description - string
  shift_start - integer - seconds past calendar day (00:00:00). Must be less than 86400 (seconds in a day).
  shift_end - integer - seconds past calendar day (00:00:00). If shift crosses the calendar day, then the value will be 86400 + second value to end time on final day. A resource can be active for multiple days. Each calendar day would just add 86400 to the value.
  skillset - array of strings
  speed - double - asset speed in MPH
  regionids - array of regions where the resource can patrol
```

### resource location

```
 time - date at location
 loc - geo_point
```

### patrol
Unit of work that applies a resource towards completing objective(s). One to many patrols are required to satisfy an objective.

**Actions**
* Create
* Cancel

```
  resource_id - id of resource allocated to patrol
  primary_objective - id of primary objective
  secondary_objectives - array of objective ids
  start - date
  end - date
  cancelled - boolean indicating if patrol has been cancelled
  cancelDetails - object
    tags - array of strings identifingy why patrol was cancelled - such as 'weater', 'reschedule', 'equipment_malfunction', 'personal', and so on.
    reason - More detailed explaination
```

### region

```
  id - string
  name - string 
  description - string
  loc - geo_shape
```

### target

```
  id - string
  name - string
  description - string
  location - geo_point
  regionid - binds targets to region, could be zip code or something similiar
```

### objective

```
  id - string
  name - string
  description - string
  directive - tag defining higher-level grouping of objectives
  originiator - id 
  targets - array of target ids
  priority - integer
  skillsets - array of tags identifing capabilities required to meet the objective
  start
  end
```
