interface Diction{
    [key: string]: string | Number;
}

function queryCollection(someObject: any) {
    let query = {};
    query = whereCountry(someObject, query);
    query = whereCity(someObject, query);
    query = whereMood(someObject, query);
    query = whereFoodType(someObject, query);
}

function whereCountry(someObject: any, query: any) {
    if (someObject.country !== undefined) {
    query.country = someObject.country;
    }
    return query;
}

function whereCity(someObject: any, query: any) {
    if (someObject.city !== undefined) {
    query.city = someObject.city;
    }
    return query;
}

function whereMood(someObject: any, query: any) {
    if (someObject.mood !== undefined) {
    query.mood = {$in : someObject.mood};
    }
    return query;
}

function whereFoodType(someObject: any, query: any) {
    if (someObject.foodType !== undefined) {
    query.foodType = {$in : someObject.foodType};
    }
    return query;
}

export {
    whereCity,
    whereCountry,
    whereFoodType,
    whereMood,
    queryCollection,
    Diction
}