# Clean Code Rules Reference

Comprehensive guide to writing maintainable, readable code.

---

## SOLID Principles

### Single Responsibility Principle (SRP)
> A class should have only one reason to change.

**Bad:**
```typescript
class User {
  saveToDatabase() { }
  sendEmail() { }
  generateReport() { }
}
```

**Good:**
```typescript
class User { }
class UserRepository { saveUser(user: User) { } }
class EmailService { sendEmail(user: User) { } }
class ReportGenerator { generateReport(user: User) { } }
```

### Open/Closed Principle (OCP)
> Open for extension, closed for modification.

**Bad:**
```typescript
function calculateArea(shape) {
  if (shape.type === 'circle') return Math.PI * shape.radius ** 2;
  if (shape.type === 'square') return shape.side ** 2;
  // Adding new shape requires modifying this function
}
```

**Good:**
```typescript
interface Shape { area(): number; }
class Circle implements Shape { area() { return Math.PI * this.radius ** 2; } }
class Square implements Shape { area() { return this.side ** 2; } }
// New shapes just implement the interface
```

### Liskov Substitution Principle (LSP)
> Subtypes must be substitutable for their base types.

**Bad:**
```typescript
class Bird { fly() { } }
class Penguin extends Bird { fly() { throw new Error("Can't fly"); } }
```

**Good:**
```typescript
class Bird { }
class FlyingBird extends Bird { fly() { } }
class Penguin extends Bird { swim() { } }
```

### Interface Segregation Principle (ISP)
> Clients should not depend on interfaces they don't use.

**Bad:**
```typescript
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}
class Robot implements Worker { eat() { throw new Error(); } }
```

**Good:**
```typescript
interface Workable { work(): void; }
interface Eatable { eat(): void; }
class Robot implements Workable { work() { } }
class Human implements Workable, Eatable { }
```

### Dependency Inversion Principle (DIP)
> Depend on abstractions, not concretions.

**Bad:**
```typescript
class UserService {
  private db = new PostgresDatabase();
}
```

**Good:**
```typescript
interface Database { query(sql: string): Promise<any>; }
class UserService {
  constructor(private db: Database) { }
}
```

---

## Function Guidelines

### Size
- Maximum 50 lines (ideally < 20)
- Maximum 4 parameters (use object if more)
- Maximum 2 levels of nesting

### Naming
```typescript
// Verbs for actions
function calculateTotal() { }
function fetchUser() { }
function validateInput() { }

// Predicates return boolean
function isValid() { }
function hasPermission() { }
function canEdit() { }
```

### Arguments
```typescript
// Bad: more than 4 arguments
function createUser(name, email, age, role, department, manager) { }

// Good: use object
function createUser(options: CreateUserOptions) { }
```

---

## Class Guidelines

### Size
- Maximum 300 lines
- Maximum 10 public methods
- Maximum 5 dependencies

### Cohesion
All methods should use most instance variables. If methods split into groups using different variables, split the class.

---

## Complexity Thresholds

| Metric | Warning | Error | Action |
|--------|---------|-------|--------|
| Cyclomatic Complexity | > 10 | > 15 | Split function |
| Cognitive Complexity | > 15 | > 25 | Simplify logic |
| Function Length | > 30 lines | > 50 lines | Extract |
| File Length | > 200 lines | > 300 lines | Split |
| Nesting Depth | > 3 | > 4 | Early return |

---

## Refactoring Patterns

### Extract Method
```typescript
// Before
function process() {
  // 10 lines of validation
  // 10 lines of calculation
  // 10 lines of formatting
}

// After
function process() {
  validate();
  calculate();
  format();
}
```

### Replace Conditional with Polymorphism
```typescript
// Before
function getSpeed(vehicle) {
  switch(vehicle.type) {
    case 'car': return vehicle.speed;
    case 'bike': return vehicle.speed * 0.8;
  }
}

// After
interface Vehicle { getSpeed(): number; }
class Car implements Vehicle { getSpeed() { return this.speed; } }
class Bike implements Vehicle { getSpeed() { return this.speed * 0.8; } }
```

### Introduce Parameter Object
```typescript
// Before
function search(startDate, endDate, minPrice, maxPrice, category) { }

// After
interface SearchCriteria { dates: DateRange; price: PriceRange; category: string; }
function search(criteria: SearchCriteria) { }
```
