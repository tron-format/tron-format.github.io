# TRON Specification

TRON (Token Reduced Object Notation) is a data serialization format that extends JSON. It is designed to be more compact by allowing the definition of "classes" (schemas) for objects, reducing the repetition of property names. TRON is a superset of JSON, meaning any valid JSON is also valid TRON.

## 1. Quick Example

Let's start with a simple example before we get into the details of the format.

The following shows the same data represented in JSON and TRON.

<table class="comparison-table">
<tr class="header-row">
<th>JSON</th>
<th>TRON</th>
</tr>
<tr>
<td data-label="JSON">

```json
{
  "index": "ord-123",
  "items": [
    {
      "index": 1,
      "name": "Widget",
      "price": 19.99,
      "quantity": 2
    },
    {
      "index": 2,
      "name": "Gadget",
      "price": 29.99,
      "quantity": 1
    },
    {
      "index": 3,
      "name": "Gizmo",
      "price": 39.99,
      "quantity": 1
    }
  ],
  "total": 109.96
}
```
<span class="code-footnote">131 tokens for OpenAI models (73 tokens if fully compressed)</span>

</td>
<td data-label="TRON">

```python
class Order:
  index,items,total

class Product:
  index,name,price,quantity

Order(
  "ord-123",
  [
    Product(1,"Widget",19.99,2),
    Product(2,"Gadget",29.99,1),
    Product(3,"Gizmo",39.99,1)
  ],
  109.96
)
```
<span class="code-footnote">80 tokens for OpenAI models (64 tokens if fully compressed)</span>

</td>
</tr>
</table>

## 2. Format Structure

The TRON format consists of two parts:
1.  **Header**: Optional class definitions.
2.  **Data**: A single root value (object, array, or literal).

The data section begins at the first non-indented (non empty, and non-commented) line that does not start with the keyword `class`.

Alternatively, the header and data section can be separated by a semicolon `;` of a newline.

## 3. Comments

TRON supports single-line comments starting with the `#` character. Comments can appear anywhere and extend to the end of the line.

```python
# This is a comment
class User: name, age # Inline comment
```

## 4. Class Definitions

Classes define a schema for objects, specifying an ordered list of property names.

### Syntax

A typical class definition has the following form.

```python
class ClassName: property1,property2,...
```

Class definitions can also have this form.

```python
class ClassName:
  property1
  property2
  ...
```

*   **Class Names**:
    *   Must be alphanumeric.
    *   Cannot start with a number.
    *   Underscores `_` are allowed but not recommended.
    *   Reserved words: `class`, `true`, `false`, `null` cannot be used as class names.
*   **Separators**:
    *   Multiple class definitions on the same line must be separated by semicolons `;`.
    *   The space following the semicolon is optional.
    *   A semicolon at the end of the class definition is optional, unless followed by another class definition or the data section in the same line.

At least one property name must be specified. Creating a class with no properties is not supported.

### Property Lists

Properties within a class definition can be separated by:
*   Commas `,`
*   Newlines (with consistent indentation)

Trailing commas are optional.

**Property Naming Rules:**
*   Property names can be unquoted if they contain only letters, numbers, or underscores.
*   Property names **must** be enclosed in double quotes `"` if they contain any characters other than letters, numbers, or underscores.
*   Quoted property names follow the same rules as JSON strings. For instance, if the property name contains a double quote, it must be escaped with a backslash (i.e. `\"`).

**Examples:**

```python
# Comma separated
class Point: x, y

# Newline separated
class Person:
  first_name
  last_name
  age

# Mixed
class Address:
  street, city,  # trailing comma is optional
  zip_code, country

# Quoted Properties
class Headers: "Content-Type", "Authorization"

```

### Extending an Existing Class

Extending from an existing class is also supported.

```python
class Point: x, y
class Point3D(Point): z
```

The properties of `Point3D` are the same as `Point`, plus `z` (i.e. the properties are `x`, `y`, and `z`, in that order).

## 5. Data Representation

TRON supports all JSON data types and adds Class Instantiation.

### JSON Types

Strings, numbers, booleans, null, and arrays are represented exactly as in JSON.

*   **Strings**: Double-quoted `"string"`.
*   **Numbers**: `123`, `12.34`.
*   **Booleans**: `true`, `false`.
*   **Null**: `null`.
*   **Arrays**: `[value1, value2]`.
*   **Empty Objects**: `{}`.

### Class Instantiation

Objects can be instantiated using defined classes. This creates an object with keys from the class definition and values from the arguments.

**Syntax:**

```python
ClassName(value1, value2, ...)
```

*   The number of arguments must match the number of properties in the class definition.
*   The order of arguments corresponds to the order of properties.
*   Creating an empty object using class instantiation is not possible.

**Example:**

Given the class:
```python
class Point: x, y
```

The instantiation:
```python
Point(10, 20)
```

Is equivalent to the JSON (which is also valid TRON):
```json
{
  "x": 10,
  "y": 20
}
```

### Nested Structures

Class instances can be nested within other class instances, arrays, or standard objects.

```python
class User: index, profile
class Profile: name, email

User(1, Profile("Alice", "alice@example.com"))
```

### Named Arguments

Arguments can also be assigned by name using the `name=value` syntax. This allows arguments to be provided in any order.

```python
class MyClass: a, b

MyClass(a=1, b=2)    # Equivalent to MyClass(1, 2)
MyClass(b=2, a=1)    # Also equivalent to MyClass(1, 2)
```

**Mixed Positional and Named Arguments:**

Named arguments can follow positional arguments, but positional arguments **cannot** follow named arguments.

```python
class MyClass: a, b

MyClass(1, b=2)      # Valid: positional 'a', named 'b'
MyClass(a=1, 2)      # Invalid: positional after named (SyntaxError)
```

**Argument Name Rules:**

*   Argument names can be unquoted if they contain only letters, numbers, or underscores.
*   Argument names can be quoted: `"a"=1` is equivalent to `a=1`.
*   Each argument name must be a valid property defined in the class (SyntaxError otherwise).
*   Each argument name can only appear once (SyntaxError for duplicates).
*   All properties must be assigned, either positionally or by name (SyntaxError if any are missing).

**Examples:**

```python
class Point: x, y

# All equivalent
Point(10, 20)
Point(x=10, y=20)
Point(y=20, x=10)
Point(10, y=20)
Point("x"=10, "y"=20)  # quoted property names allowed

# Invalid examples (all raise SyntaxError)
Point(x=10)            # missing 'y'
Point(x=10, y=20, z=30) # 'z' is not a property
Point(x=10, x=20)      # duplicate 'x'
Point(x=10, 20)        # positional after named
```

### Trailing Commas

Unlike JSON, TRON allows an optional trailing comma after the last item in:
*   Arrays: `[1, 2,]`
*   Standard Objects: `{"key": "value",}`
*   Objects from Class Instantiations: `Point(1, 2,)`

## 6. Whitespace

Whitespace is generally insignificant, except:
*   The space following the `class` keyword.
*   In strings.
*   When newline is significant under the following conditions:
    * a semicolon is not used to separate class definitions.
    * a comma is not used to separate the property names of the class.
    * a semicolon is not used to separate the header and data sections.

When separating property names with newlines, it is strongly recommended to use consistent indentation for readability. However, identation is not required since a property and a class instantiated object can be differentiated based on whether the unquoted indentifier is followed by a left bracket.

## 7. Best Practices

The following are best practices for encoding data in TRON.

### Notes on Readability

The features that TRON adds beyond JSON are primarily focused on LLM token efficiency rather than human readability. If human readability is preferred, continue to encode data as JSON with indentation.

Although TRON supports named arguments for improved readability, this feature is intended to support annotating existing TRON files by hand if desired. SDKs that implement TRON encoding should avoid adding named arguments programmatically to class instantiated objects.

### Token Efficient Data Representation

When defining a set of named items, it is recommended to represent them as a list of objects instead of key-value pairs where the key is the name and the value is the item. This results in better token efficiency when encoding the data as TRON.

For instance, instead of representing the data like this:

```json
{
  "name1": {
    "prop1": "value1",
    "prop2": "value2"
  },
  "name2": {
    "prop1": "value1",
    "prop2": "value2"
  }
}
```

you should represent it like this if possible:

```json
[
  {
    "name": "name1",
    "prop1": "value1",
    "prop2": "value2"
  },
  {
    "name": "name2",
    "prop1": "value1",
    "prop2": "value2"
  }
]
```

### Token Efficient Encoding Strategies

SDKs that implement TRON encoding should aim to minimize the number of tokens by default. Here are some simple tips to achieve this:
*   Use letters A-Z for class names. After the first 26 classes, use A1-Z1, A2-Z2, etc.
*   Use either JSON syntax or class instantiation based on the number of properties and occurrences of the object structure. The following strategy tends to be most practical for achieving fewer tokens than pure JSON encoding in most cases.
    *   If an object structure has only one property OR only occurs once, encode with JSON syntax without defining a class (i.e., do `{"property": "value"}` instead of `A("value")`).
    *   Otherwise (if an object structure has more than one property AND more than occurrences), define a class and encode each occurrence with class instantiation.
*   Although the strategy above has higher potential to achieve more token reduction, it does not always guarantee fewer tokens than pure JSON encoding. The following strategy is mathematically proven to always result in fewer (or equal) tokens than pure JSON encoding, but has a lower potential for a large percentage in token reduction:
    *   Let `x` be the number of properties in the object structure, and `n` be the number of occurrences of the object structure.
    *   If `x > 1` and `n > (2x + 3) / (2x - 2)` for the object structure, define a class and encode each occurrence with class instantiation. Otherwise, encode with JSON syntax without defining a class.
    *   Note that this strategy is more difficult to unit test for little to no benefit over the first strategy in most cases.

In addition, the following are more ideas to achieve even better token efficiency, though they come with some trade-offs:
*   Define the class definitions in descending order by their occurrence. For instance, use "A" for the most frequent object, "B" for the second most frequent, etc. However, this may make the ordering of the class definitions seem random and less intuitive when compared to the JSON representation, and is only beneficial if there are more than 26 classes.
*   Pick class names from a large set of single token words instead of using A-Z, A1-Z1, A2-Z2, etc. However, this does not guarantee an infinite choice of class names if you attempt to always use one token per class name.
