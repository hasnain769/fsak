# Mocking Patterns Reference

Guidelines for effective test isolation through mocking.

---

## When to Mock

| Mock | Don't Mock |
|------|------------|
| External APIs (HTTP, third-party) | Your own pure functions |
| Database queries | Simple data transformations |
| File system operations | Business logic |
| Time/Date functions | Deterministic calculations |
| Random number generators | Immutable data structures |

---

## JavaScript/TypeScript Mocking (Vitest)

### Function Mock
```typescript
import { vi } from 'vitest';

// Create mock function
const mockFn = vi.fn();
mockFn.mockReturnValue('result');
mockFn.mockResolvedValue('async result');

// Verify calls
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(2);
```

### Module Mock
```typescript
// Mock entire module
vi.mock('../src/api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ name: 'Test' }),
}));

// Import after mock
import { fetchUser } from '../src/api';
```

### Spy on Method
```typescript
const obj = { method: () => 'original' };
const spy = vi.spyOn(obj, 'method');
spy.mockReturnValue('mocked');

// Later restore
spy.mockRestore();
```

### Mock Timer
```typescript
vi.useFakeTimers();

// Advance time
vi.advanceTimersByTime(1000);
vi.runAllTimers();

// Restore
vi.useRealTimers();
```

---

## Python Mocking (pytest + unittest.mock)

### Function Mock
```python
from unittest.mock import Mock, MagicMock

# Basic mock
mock = Mock()
mock.return_value = 'result'

# Async mock
mock = MagicMock()
mock.return_value.__aenter__.return_value = 'async result'

# Verify
mock.assert_called()
mock.assert_called_with('arg')
mock.assert_called_once()
```

### Patch Decorator
```python
from unittest.mock import patch

@patch('module.function')
def test_something(mock_function):
    mock_function.return_value = 'mocked'
    # Test code
    mock_function.assert_called()
```

### Context Manager Patch
```python
with patch('module.function') as mock:
    mock.return_value = 'mocked'
    result = code_under_test()
```

### Patch Object Attribute
```python
@patch.object(MyClass, 'method')
def test_method(mock_method):
    mock_method.return_value = 'mocked'
```

---

## Common Patterns

### HTTP Client Mock (TypeScript)
```typescript
vi.mock('axios');
import axios from 'axios';

const mockAxios = vi.mocked(axios);
mockAxios.get.mockResolvedValue({ data: { users: [] } });
```

### HTTP Client Mock (Python)
```python
@patch('requests.get')
def test_api_call(mock_get):
    mock_get.return_value.json.return_value = {'users': []}
    mock_get.return_value.status_code = 200
```

### Database Mock
```typescript
// Repository pattern - mock the repository
const mockRepo = {
  findById: vi.fn().mockResolvedValue({ id: '1', name: 'Test' }),
  save: vi.fn().mockResolvedValue({ id: '1' }),
};

const service = new UserService(mockRepo);
```

### Environment Variables
```typescript
vi.stubEnv('API_KEY', 'test-key');
// After test
vi.unstubAllEnvs();
```

```python
@patch.dict('os.environ', {'API_KEY': 'test-key'})
def test_with_env():
    pass
```

---

## Test Doubles Glossary

| Type | Purpose | Example |
|------|---------|---------|
| **Stub** | Returns predefined data | `mock.mockReturnValue(data)` |
| **Mock** | Verifies interactions | `expect(mock).toHaveBeenCalled()` |
| **Spy** | Wraps real implementation | `vi.spyOn(obj, 'method')` |
| **Fake** | Working implementation (simplified) | In-memory database |
| **Dummy** | Placeholder, never used | Empty object passed for required param |
