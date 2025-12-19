// Test script for DimitarApitest API
// This script tests the smart contract integration endpoints

const axios = require('axios');

const BASE_URL = 'http://localhost:4000/api/dimitarApitest';

// Test functions
async function testDethInfo() {
  console.log('\n========================================');
  console.log('Testing: GET /api/dimitarApitest/deth-info');
  console.log('========================================');
  
  try {
    const response = await axios.get(`${BASE_URL}/deth-info`);
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

async function testSethInfo() {
  console.log('\n========================================');
  console.log('Testing: GET /api/dimitarApitest/seth-info');
  console.log('========================================');
  
  try {
    const response = await axios.get(`${BASE_URL}/seth-info`);
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

async function testWalletBalance() {
  console.log('\n========================================');
  console.log('Testing: GET /api/dimitarApitest/wallet-balance/:address');
  console.log('========================================');
  
  // Test with a sample address (replace with your MetaMask address)
  const testAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  
  try {
    const response = await axios.get(`${BASE_URL}/wallet-balance/${testAddress}`);
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

async function testAllContracts() {
  console.log('\n========================================');
  console.log('Testing: GET /api/dimitarApitest/all-contracts');
  console.log('========================================');
  
  try {
    const response = await axios.get(`${BASE_URL}/all-contracts`);
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║  DimitarApitest - Smart Contract API Tests    ║');
  console.log('╚════════════════════════════════════════════════╝');
  
  await testDethInfo();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testSethInfo();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testWalletBalance();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testAllContracts();
  
  console.log('\n========================================');
  console.log('All tests completed!');
  console.log('========================================\n');
}

// Run the tests
runAllTests();
