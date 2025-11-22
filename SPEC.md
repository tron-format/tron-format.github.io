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
<span class="code-footnote">80 tokens for OpenAI models (65 tokens if fully compressed)</span>

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

*   **Class Names**:
    *   Must be alphanumeric.
    *   Cannot start with a number.
    *   Underscores `_` are allowed but not recommended.
    *   Reserved words: `class`, `true`, `false`, `null` cannot be used as class names.
*   **Separators**:
    *   Multiple class definitions on the same line must be separated by semicolons `;`.
    *   The space following the semicolon is optional.
    *   A semicolon at the end of the class definition is optional, unless followed by another class definition or the data section in the same line.

### Property Lists

Properties within a class definition can be separated by:
*   Commas `,`
*   Newlines (must use consistent indentation)

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

### Trailing Commas

Unlike JSON, TRON allows an optional trailing comma after the last item in:
*   Arrays: `[1, 2,]`
*   Standard Objects: `{"key": "value",}`
*   Objects from Class Instantiations: `Point(1, 2,)`

## 6. Whitespace

Whitespace is generally insignificant, except:
*   The space following the `class` keyword.
*   In strings.
*   Newline is significant if a semicolon is not used to separate class definitions or the header and data sections.
*   Indentation is significant for newline-separated property lists in class definitions.
