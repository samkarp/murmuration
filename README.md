
## Data types

### resource
Entity with a particular skillset that is scheduled against objectives.

```
  id - string
  name - string
  shift_start - date
  shift_end - date
  skillset - array of strings
  speed
  duration
```

### patrol

```
  resource_id - id of resource allocated to patrol
  primary_objective - id of primary objective
  secondary_objectives - array of objective ids
  start
  end
```

### target

```
  id
  name
  lat
  lon
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
  priority - integar
```
