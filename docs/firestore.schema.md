## FIRESTORE SCHEMA

These are root level collections, [as suggested by Firebase] (https://firebase.google.com/docs/firestore/manage-data/structure-data)

# Publisher
```
 string              : name
 string              : website url
```

# Song
```
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
[publisher]       : [uuid]
[string]          : url to portrait
```

# Choir 
```
 string           : name
 string           : parish name
 string           : mass time
```

# Choir (collection) - (uuid):Liturgy (collection)
```
 name             : name of the liturgy
 timestamp        : liturgy date and time
 string           : location 
[string]          : comments
```
