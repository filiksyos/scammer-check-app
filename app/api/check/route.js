import { NextResponse } from 'next/server';
import Exa from 'exa-js';

const exa = new Exa(process.env.EXA_API_KEY);

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a valid name' },
        { status: 400 }
      );
    }

    // Step 1: Search for information using Exa
    const searchResults = await exa.searchAndContents(
      `${name} scam fraud controversy reviews complaints`,
      {
        type: 'neural',
        useAutoprompt: true,
        numResults: 10,
        text: true,
      }
    );

    // Also search for positive information
    const positiveResults = await exa.searchAndContents(
      `${name} legitimate business verified credentials`,
      {
        type: 'neural',
        useAutoprompt: true,
        numResults: 5,
        text: true,
      }
    );

    // Combine results
    const allResults = [...searchResults.results, ...positiveResults.results];

    if (allResults.length === 0) {
      return NextResponse.json(
        { error: 'No information found about this person' },
        { status: 404 }
      );
    }

    // Step 2: Extract text content for AI analysis
    const contentSummary = allResults
      .map((result, index) => {
        const text = result.text ? result.text.substring(0, 500) : '';
        return `[Source ${index + 1}]: ${result.title}\n${text}`;
      })
      .join('\n\n');

    // Step 3: Get image URL (from first result if available)
    const imageUrl = allResults.find(r => r.image)?.image || null;

    // Step 4: Use AI to analyze and generate scammer score
    const prompt = `You are an expert fraud analyst. Analyze the following information about "${name}" and provide a scammer probability assessment.

Information gathered:
${contentSummary}

Provide your analysis in the following JSON format:
{
  "scammerScore": <number between 0-100>,
  "summary": "<2-3 sentence overview>",
  "reasons": ["<reason 1>", "<reason 2>", "<reason 3>", "<reason 4>"]
}

Scoring guidelines:
- 0-30: Likely legitimate with strong positive reputation
- 31-50: Mixed reviews, some concerns but not definitive
- 51-70: Multiple red flags, proceed with caution
- 71-100: High probability of scam, strong evidence of fraud

Be objective and base your score on the evidence found. Include both positive and negative findings in your reasoning.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a fraud detection expert providing objective analysis based on available evidence.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('AI analysis failed');
    }

    const responseData = await response.json();
    const aiResponse = responseData.choices[0]?.message?.content;
    
    // Parse AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Step 5: Return complete result
    return NextResponse.json({
      name,
      scammerScore: analysis.scammerScore,
      summary: analysis.summary,
      reasons: analysis.reasons,
      imageUrl,
      sourcesCount: allResults.length,
    });

  } catch (error) {
    console.error('Error in check API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze. Please try again.' },
      { status: 500 }
    );
  }
}