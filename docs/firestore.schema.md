## FIRESTORE SCHEMA

These are root level collections, [as suggested by Firebase] (https://firebase.google.com/docs/firestore/manage-data/structure-data)

# Song
```
 string           : title
 string           : first lines   
[uuid]            : [composer id]
 string           : directory where song files are
[string : uuid]   : [media name: media type] : 
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

# Parish (collection) - (uuid):Liturgy (collection)
```
 name             : name of the liturgy
 timestamp        : liturgy date and time
 string           : location 
[string]          : comments
```