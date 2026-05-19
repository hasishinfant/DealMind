// Test script to verify API keys are working

async function testGroqAPI() {
  console.log('\n🔍 Testing Groq API...')
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: 'Say hello in 5 words' }],
        max_tokens: 20,
      }),
    })

    if (!response.ok) {
      console.log('❌ Groq API Error:', response.status, response.statusText)
      const error = await response.text()
      console.log('   Error details:', error)
      return false
    }

    const data = await response.json()
    console.log('✅ Groq API Working!')
    console.log('   Model:', data.model)
    console.log('   Response:', data.choices[0].message.content)
    console.log('   Tokens used:', data.usage.total_tokens)
    return true
  } catch (error) {
    console.log('❌ Groq API Failed:', error.message)
    return false
  }
}

async function testHindsightAPI() {
  console.log('\n🔍 Testing Hindsight API...')
  try {
    const pipelineId = process.env.HINDSIGHT_PIPELINE_ID
    const response = await fetch(
      `https://api.hindsight.vectorize.io/v1/pipelines/${pipelineId}/retrieve`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HINDSIGHT_API_KEY}`,
        },
        body: JSON.stringify({
          query: 'test negotiation',
          topK: 2,
        }),
      }
    )

    if (!response.ok) {
      console.log('❌ Hindsight API Error:', response.status, response.statusText)
      const error = await response.text()
      console.log('   Error details:', error)
      console.log('   Pipeline ID:', pipelineId)
      console.log('   ⚠️  Note: You may need to create a pipeline in Hindsight dashboard')
      return false
    }

    const data = await response.json()
    console.log('✅ Hindsight API Working!')
    console.log('   Documents found:', data.documents?.length || 0)
    return true
  } catch (error) {
    console.log('❌ Hindsight API Failed:', error.message)
    return false
  }
}

async function testNegotiateEndpoint() {
  console.log('\n🔍 Testing /api/negotiate endpoint...')
  try {
    const response = await fetch('http://localhost:3001/api/negotiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'instagram_token=demo_token',
      },
      body: JSON.stringify({
        brand: 'TestBrand',
        category: 'Skincare',
        offeredRate: 300,
        conversationHistory: [],
        latestMessage: 'We would like to offer you $300 for 2 Instagram posts',
      }),
    })

    if (!response.ok) {
      console.log('❌ Negotiate API Error:', response.status, response.statusText)
      const error = await response.json().catch(() => ({ error: 'Could not parse error' }))
      console.log('   Error details:', error)
      return false
    }

    const data = await response.json()
    console.log('✅ Negotiate API Working!')
    console.log('   Suggested rate:', data.suggestedRate)
    console.log('   Draft preview:', data.draft?.substring(0, 100) + '...')
    console.log('   Model used:', data.route?.draftModel)
    console.log('   Cost saved:', data.route?.savedPercent + '%')
    return true
  } catch (error) {
    console.log('❌ Negotiate API Failed:', error.message)
    return false
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════')
  console.log('  DealMind API Key Test Suite')
  console.log('═══════════════════════════════════════')

  const groqWorking = await testGroqAPI()
  const hindsightWorking = await testHindsightAPI()
  const negotiateWorking = await testNegotiateEndpoint()

  console.log('\n═══════════════════════════════════════')
  console.log('  Test Results Summary')
  console.log('═══════════════════════════════════════')
  console.log(`Groq API:       ${groqWorking ? '✅ Working' : '❌ Failed'}`)
  console.log(`Hindsight API:  ${hindsightWorking ? '✅ Working' : '⚠️  Not configured'}`)
  console.log(`Negotiate API:  ${negotiateWorking ? '✅ Working' : '❌ Failed'}`)
  console.log('═══════════════════════════════════════\n')

  if (!hindsightWorking) {
    console.log('ℹ️  Hindsight Setup Instructions:')
    console.log('   1. Go to https://hindsight.vectorize.io/')
    console.log('   2. Create a new pipeline')
    console.log('   3. Update HINDSIGHT_PIPELINE_ID in .env.local')
    console.log('   4. Restart the dev server\n')
  }

  process.exit(groqWorking && negotiateWorking ? 0 : 1)
}

// Load environment variables manually
const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)$/)
  if (match) {
    const key = match[1].trim()
    const value = match[2].trim()
    process.env[key] = value
  }
})

// Run tests
runTests()
