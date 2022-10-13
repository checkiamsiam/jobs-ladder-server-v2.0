## Tour Management System
This system, I have provide several endpoints to the client. The endpoints are:

### GET /tours
- Get all the tours
- The client can select some specific fields for getting the information he needs as query. 
- Must be paginated.
- The client can send a field as query to sort the data with it.

### POST /tours
- Add a tour with schema validation

### GET /tours/:id
- Get a tour details by id
- Counting view

### PATCH /tours/:id
- Update a tour with schema validation

### GET /tours/trending
- Get top 3 viewed tour

### GET /tours/cheapest
- Get top 3 cheapest tours


