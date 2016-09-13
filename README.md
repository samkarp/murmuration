
## Data types

### resource
Entity with a particular skillset that is scheduled against objectives.

```
  id - string
  name - string
  description - string
  shift_start - integer - seconds past calendar day (00:00:00). Must be less than 86400 (seconds in a day).
  shift_end - integer - seconds past calendar day (00:00:00). If shift crosses the calendar day, then the value will be 86400 + second value to end time on final day. A resource can be active for multiple days. Each calendar day would just add 86400 to the value.
  skillset - array of strings
  speed
  duration
  regionids - array of regions where the resource can patrol
```

### patrol
Unit of work that applies a resource towards completing objective(s). One to many patrols are required to satisfy an objective.

```
  resource_id - id of resource allocated to patrol
  primary_objective - id of primary objective
  secondary_objectives - array of objective ids
  start - date
  end - date
```

### target

```
  id
  name
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
