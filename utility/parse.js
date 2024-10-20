// parse function to parse json trans data and put them into transaction arrays

import fs from 'fs';
const transactions = JSON.parse(fs.readFileSync('transactions.json', 'utf8'));
let data = [];

// Loop through the transactions (assumes there are at least 10 transactions)
for (let i = 0; i < 10; i++) {
    const transaction = transactions['transactions'][i];
    const categorization = transaction['categorization'] || {};

    let row_df = {
        id: transaction['id'] || null,
        amount: transaction['amount'] || null,
        accountId: transaction['accountId'] || null,
        customerId: transaction['customerId'] || null,
        status: transaction['status'] || null,
        description: transaction['description'] || null,
        memo: transaction['memo'] || null,
        postedDate: transaction['postedDate'] || null,
        transactionDate: transaction['transactionDate'] || null,
        createdDate: transaction['createdDate'] || null,
        categorization_normalizedPayeeName: categorization['normalizedPayeeName'] || null,
        categorization_category: categorization['category'] || null,
        categorization_bestRepresentation: categorization['bestRepresentation'] || null,
        categorization_country: categorization['country'] || null
    };

    data.push(row_df);
}

console.log(data);
