## Director frontend

### Redux actions description

In essence to track all actions Director front-end utilizes Redux (Flux) implementation.
Below is description of all actions for general purpose models, such Items, Colors and so on which share the same approach of managing records and access API in the similar ways.

Action types: 

**SET** - put the list of records into Redux state. This actions loads all records to redux state and 
used very rarely due to more optimal approach of loading data by page in sake of better memory utilization. 

**SET_BY_PAGE** - set records data in Redux global state by pages, accept following object as payload:

```
payload: {
  [model-name]: records, // where model-name 
  represent the data model, in example colours
  pages: number, // overall amount of available pages (by default by 50 records) of records
  page: number // current loaded page
}
```

**ADD** - add a record to global state records object, in addition to that increases amount of available record for the particular model

**SET_TRASH** - set mount of records in the model trash bin (***it's not actual records, it's quantity only!***)

**SET_AVAILABLE** - set amount of all available records which could be consumed from API server related to particular model.

**TRASH** - increase amount of records in trash bin and in the same time reduce amount of available records, in addition to that remove record with provided id from records list (which are currently visible) in case there is the record with such id.

**RECOVER** - transfer record from trash and put the record to global Redux state records (relative to the model), in the same time change amount of trash records and available records correspondingly. The added record has field *recent:true* to highlight it in the records list. 

**DELETE** - just decrease amount of trash records as all trash operations are handled by ModelTrash container and it doesn't use Redux global state to store records. 

**SET_RECORD** - set current record in the Redux global state, used for editing purposes.

**CHANGE** - changes record in global state records list (in case there is record with provided id)
