 angular.module('AWSDynamoService', []).service('AWSDynamoService', function($http){
 	this.invokeDynamoDb = function(region,identitypoolId,tableName,callback) {
         // Initialize the Amazon Cognito credentials provider
		AWS.config.region = region; // Region
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: identitypoolId,
		});

		var dynamodb =new AWS.DynamoDB({dynamoDbCrc32: false});
		// var params = { TableName: tableName, ScanIndexForward: true,};

    var params = {
      TableName :tableName,
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index                   // with 'EQ' operator
                     "key": {
            ComparisonOperator: 'EQ', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN | 
                                      //  NOT_NULL | NULL | CONTAINS | NOT_CONTAINS | BEGINS_WITH)
 AttributeValueList: [ { S: 'AcMonitor' }, ],
},

        // more key conditions ...
      },
      ScanIndexForward: false,
      Limit:10
    };
    dynamodb.query(params, function(err, data) {
     if (err) {
      console.log(err);
      return null;
    } else {
      return callback(data);

    }
  });

  },
  this.switchOffAc=function(url,successCallback,errorCallback){
   
    $http.get(url).then(function(response){
     return successCallback(response);

   },
   function(err){
     return errorCallback(err);

   });

  }

});