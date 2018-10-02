## FIRESTORE SCHEMA

These are root level collections, [as suggested by Firebase] (https://firebase.google.com/docs/firestore/manage-data/structure-data)

# Publisher
```
 string              : name
 string              : website url
```

# Song
```
 uuid            : song_id
 string           : title
 string           : first lines   
[uuid]            : [composer id]
 string           : directory where song files are
[string : uuid]   : [{media name: string, media type:string},...] 
[string]          : [tag]
[uuid]            : [publisher]
```
# Composer
```
 string           : first name
 string           : last name
[string]          : publisher
[string]          : url to portrait
```

# Choir (collection)
```
 string         : name of choir
 string         : location of choir
 string         : comments
```

# Liturgy (collection)
```
 uuid           : id
 uuid           : choir_id
 string         : title
 timestamp      : date
 ```

# Liturgy Parts (collection)
```
 uuid : liturgy id
 string : part section
 string : part name
 uuid : song id
 int : order
```


 
