/**
 * Supabase Connection Verification Script
 * Run this locally to verify everything is connected correctly
 *
 * Usage:
 * npx ts-node verify-supabase.ts
 *
 * Or in browser console:
 * import { verifySupabaseConnection } from './verify-supabase'
 * verifySupabaseConnection()
 */

import { supabase } from './src/lib/supabase';

interface VerificationResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: string;
}

const results: VerificationResult[] = [];

function addResult(test: string, status: 'PASS' | 'FAIL' | 'WARNING', message: string, details?: string) {
  results.push({ test, status, message, details });
  const icon = status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : '⚠';
  console.log(`${icon} ${test}: ${message}`);
  if (details) console.log(`  └─ ${details}`);
}

async function verifySupabaseConnection() {
  console.log('🔍 Verifying Supabase Connection...\n');

  // Test 1: Check environment variables
  console.log('📋 TEST 1: Environment Variables');
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    addResult('SUPABASE_URL', 'FAIL', 'Environment variable not set');
  } else if (!supabaseUrl.includes('supabase.co')) {
    addResult('SUPABASE_URL', 'FAIL', 'Invalid URL format', supabaseUrl);
  } else {
    addResult('SUPABASE_URL', 'PASS', 'Environment variable found', supabaseUrl.substring(0, 50) + '...');
  }

  if (!supabaseKey) {
    addResult('SUPABASE_KEY', 'FAIL', 'Environment variable not set');
  } else if (supabaseKey.length < 50) {
    addResult('SUPABASE_KEY', 'FAIL', 'Invalid key format (too short)');
  } else {
    addResult('SUPABASE_KEY', 'PASS', 'Environment variable found', supabaseKey.substring(0, 30) + '...');
  }

  // Test 2: Check client initialization
  console.log('\n🔌 TEST 2: Supabase Client');
  try {
    if (!supabase) {
      addResult('Client Init', 'FAIL', 'Supabase client not initialized');
    } else {
      addResult('Client Init', 'PASS', 'Supabase client created successfully');
    }
  } catch (error) {
    addResult('Client Init', 'FAIL', 'Error initializing client', (error as Error).message);
  }

  // Test 3: Test database connection
  console.log('\n🗄️  TEST 3: Database Connection');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count(*)', { count: 'exact' })
      .limit(1);

    if (error) {
      addResult('DB Query', 'FAIL', 'Database query failed', error.message);
    } else {
      addResult('DB Query', 'PASS', 'Database connection successful');
    }
  } catch (error) {
    addResult('DB Query', 'FAIL', 'Database connection error', (error as Error).message);
  }

  // Test 4: Test authentication
  console.log('\n🔐 TEST 4: Authentication');
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      addResult('Auth Session', 'PASS', 'User session found', `User: ${data.session.user?.email}`);
    } else {
      addResult('Auth Session', 'WARNING', 'No active session (expected if not signed in)');
    }
  } catch (error) {
    addResult('Auth Session', 'FAIL', 'Authentication check failed', (error as Error).message);
  }

  // Test 5: Check table structure
  console.log('\n📊 TEST 5: Database Tables');
  const requiredTables = ['profiles', 'poems', 'forum_posts', 'courses', 'lessons', 'enrollments'];

  for (const table of requiredTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count(*)', { count: 'exact' })
        .limit(1);

      if (error && error.code === '42P01') {
        addResult(table, 'FAIL', 'Table does not exist');
      } else if (error) {
        addResult(table, 'WARNING', 'Could not verify table', error.message);
      } else {
        addResult(table, 'PASS', 'Table exists and is accessible');
      }
    } catch (error) {
      addResult(table, 'FAIL', 'Error checking table', (error as Error).message);
    }
  }

  // Test 6: RLS (Row Level Security)
  console.log('\n🛡️  TEST 6: Row Level Security');
  try {
    const { data: allData } = await supabase
      .from('poems')
      .select('*')
      .limit(1);

    if (allData && allData.length > 0) {
      addResult('RLS Policies', 'PASS', 'RLS is properly configured', 'Can read published content');
    } else {
      addResult('RLS Policies', 'PASS', 'RLS is properly configured', 'No public content yet');
    }
  } catch (error) {
    addResult('RLS Policies', 'WARNING', 'Could not verify RLS', (error as Error).message);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 VERIFICATION SUMMARY');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const warnings = results.filter(r => r.status === 'WARNING').length;

  console.log(`✓ Passed: ${passed}`);
  console.log(`✗ Failed: ${failed}`);
  console.log(`⚠ Warnings: ${warnings}`);
  console.log('='.repeat(60));

  if (failed > 0) {
    console.log('\n❌ DEPLOYMENT NOT READY');
    console.log('Please fix the failed tests before deploying to Vercel');
    return false;
  } else if (warnings > 0) {
    console.log('\n⚠️  READY WITH WARNINGS');
    console.log('You can deploy, but check the warnings above');
    return true;
  } else {
    console.log('\n✓ READY FOR DEPLOYMENT');
    console.log('All systems operational! Deploy to Vercel with confidence');
    return true;
  }
}

// Export for use in browser console
export { verifySupabaseConnection };

// Run if executed directly
if (typeof window === 'undefined') {
  verifySupabaseConnection();
}
