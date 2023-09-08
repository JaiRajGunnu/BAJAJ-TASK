const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // You can change the port as needed

app.use(bodyParser.json());

// Sample user_id generation function
function generateUserId(fullName, dob) {
  return `${fullName}_${dob}`;
}

app.post('/bfhl', (req, res) => {
  try {
    const {
      full_name,
      dob,
      college_email,
      college_roll_number,
      numbers,
      alphabets,
    } = req.body;

    // Calculate the highest alphabet in the input array of alphabets
    const highestAlphabet = alphabets.reduce((max, current) =>
      current > max ? current : max
    );

    // Generate user_id
    const user_id = generateUserId(full_name, dob);

    const response = {
      status: 'Success',
      user_id,
      college_email,
      college_roll_number,
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: 'Error', message: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  // For GET request, return a hardcoded operation_code
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
