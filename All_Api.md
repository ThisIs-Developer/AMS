# All APIs

## Teacher

**URL:** `localhost:8080/teacher/allStudent`

**Request Type:** GET

**Request Body:**
```json
{
    "batch": "",
    "subject name": "",
    "sem": "",
    "section": ""
}
```
**Response:**
List<AttendeceResponse>

### For Submit Button(Under teacher)

**URL:** `localhost:8080/teacher/allStudent`

**Request Type:** POST

**Request Body:** `List<AttendenceResponse>`

```json
[
    {
        
    },
    {
      
    }
]

```
**Response:** Status

## Student

**URL:** `localhost:8080/student/student_id/password`

**Request Type:** GET

**Response:**
```json
{
    // StudentProfileResponse fields here
}
```

## Admin

### Assign Teacher to Class

**URL:** `localhost:8080/admin/assign/`

**Request Type:** POST

**Request Body:**
```json
{
    "batch": "",
    "subject name": "",
    "sem": "",
    "section": "",
    "teacher": ""
}
```

**Response:** Status



### Assign Sub Teacher to Class

**URL:** `localhost:8080/admin/substitude/

**Request Type:** POST

**Request Body:**
```json
{
    "batch": "",
    "subject name": "",
    "sem": "",
    "section": "",
    "teacher": ""
}
```

**Response:** Status


### Search Student Record

**URL:** `localhost:8080/admin/roll_no

**Request Type:** GET

**Response:**
```json
{
    // StudentProfileResponse fields here
}
```

### Add faculty

**URL:** `localhost:8080/admin/manage_faculty/add

**Request Type:** Post

**Request Body:**
```json
{
"mailID":""
"pass":""
"name":""
}
```

**Response:**
```json
{
"mailID":""
"pass":""
"name":""
}
```
**Response status:** status

### Delete faculty

**URL:** `localhost:8080/admin/manage_faculty/delete

**Request Type:** Delete

**Request Body:**
```json
{
"mailID":""
}
```

**Response:** status


### View Section Record

**URL:**localhost:8080/admin/view/
**Request Type:** Get
**Request Body:** 
```json{

    "batch": "",
    "section": "",

}
```
**Response Body:**

List<SubjectResponse>

