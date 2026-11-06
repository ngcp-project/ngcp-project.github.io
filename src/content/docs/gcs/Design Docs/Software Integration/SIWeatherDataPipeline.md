---
title: Weather Data Pipeline Design Doc
description: This is a DD outlining how the weather data will be piped from weather station to GCS
---

:::note
See [How to use the Design Doc Template](/gcs/design-docs/) for instructions.
:::

**Author(s):** Your Name(s)

**Related Teams:** Any other subteam that is involved with the changes

**PR Link:** The link to the PR for this design doc

## Background
Give a brief introduction and some background on what the problem/purpose is.

What is the current state of the project and why is there an issue?
What is the purpose of the changes? (You can write it is to fulfill RFP requirements and elaborate later) 

### RFP Requirement(s)
List the RFP requirement(s) that these changes fulfill if applicable.

:::note[Example]
- [GCS_01.01] The GCS shall log connection status of all vehicles throughout the mission.
- [GCS_01.02] … 
- [GCS_01.03] …
- Etc. 
:::
## Solution
Briefly describe the feature/changes and how it will solve the problem and/or how it fulfills the corresponding RFP Requirement(s). What is the end goal? 

## Design/Implementation
This is where you flesh out the design. 

:::note
This section should not be a line for line implementation of the entire solution, but it should give whoever is reading it a good idea how it will be done. 
:::

This can include but not limited to:
- in depth background/explanations
- diagrams (preferrably using draw.io, see [Contributing Diagrams](/gcs/documentation#contributing-diagrams))
- code blocks (see [Example: Code blocks](/gcs/design-docs/designdoctemplate/#example-code-blocks))
- alternative implementations (see [Example: Alternatives](/gcs/design-docs/designdoctemplate/#example-alternatives))
- expected behavior of the change 

### Example: Code blocks
[path/to/your/file/with/hyperlink/to/yourFile.x](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
```diff
// path/to/your/file/without/hyperlink/to/yourFile.x

MyProgram {

// omit irrelevant code with a ...

+   myNewFunction() {
+    // ... 
+   }

-   myOldFunction(){
-     // ...
-   }

}
```
### Example: Alternatives

#### [PREFERRED] Implementation 1 Title
IF there is more than one method of achieving the same goal, here you will describe your preferred implementation in detail using diagrams, code blocks, etc.  

**Pros:**
- List out pros if applicable

**Cons:**
- List out cons if applicable

#### [ALTERNATIVE 1] Alternative Implementation 1 Title
Then you will describe an alternative implementation with it's pros and cons. List as many alternative sections as needed. You may have multiple subsections of preferred and alternaitve implementations for different parts of your solution. 

**Pros:**
- List out pros if applicable

**Cons:**
- List out cons if applicable

## Unit/End to End Testing

**Guides to Unit Testing** 
- Rust Unit Testing Guide: https://doc.rust-lang.org/rust-by-example/testing/unit_testing.html
- In depth Rust Unit Testing + Shortcuts/Addons: https://www.shuttle.dev/blog/2024/03/21/testing-in-rust

**Unit testing in Rust**
- $ cargo test runs all tests within the code
- To change a regular function into a test function, add #[test]
- "panic!" should be used when there is a status that is impossible is reached
- assert! checks if a statement is true

**Example code Snippet for proptesting** 

use proptest::prelude::*;

proptest! {

    #[test]
   
    fn i64_abs_is_never_negative_above_min(a in 1..1000i32) {

        assert!(a.abs() >= 0);
    }
}


**Example code snippet for basic unit testing** 

#[cfg(test)]

mod tests {
    
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(larger.can_hold(&smaller));
    }
}

- To ignore a test during runtime, add #[ignore]
- The bodies of test functions typically perform some setup, run the code we want to test, then assert whether the results are what we expect.
- Quicker average solve development time if we can catch bugs early with Unit testing vs 
executing entire program and debugging that way
- To test, define the function, then add continue by adding code as follows: 
    - mod tests 
        // Note this useful idiom: importing names from outer (for mod tests) scope.
        use super::*;
    - Then call the function with test_ ahead of it to classify as for unit testing purposes to get the resule back
    - Run cargo test after to get the specified results of the unit testing.
- ? is a rust operator, which allows for more specific testing  essentially is a signaler which immdieately ends if Result<T,e> is returned, and if Err is produced by an operator, it would be returned early.
- assert_eq! is the main thing we'd be using real time
- assert_ne! is the other function we can use which is the opposite of assert_eq and evaluates to true if the equation is false.
- You can add a second argument inside the assert statement to stand for a specific error message that you want to show to the user.
- Can add should_panic to function (#[should_panic] after #[test]), which should be used when verifying that a program panics for a certain case(s).
- When doing should_panic, you should add an expected parameter to ensure the most precise results. EX:     #[should_panic(expected = "less than or equal to 100")]
- Finally, Result<T,E> can be used if you do not want the program to panic and auto quit, this would make the program continue OR error.
- Can be implemented with Ok(T) (T is expected data) / Err(E) (E = error details)

Example usage of basic unit testing layout in Rust - 
 - testing function (add Result<T,E> if using this instead of assert)
    - mod tests 
        - use super::*
            - #[test] (add other ones if needed)
                - functionName

**Best Practices with Unit Testing in Rust**
- Make a seperate subfolder for INTEGRATION tests (not unit testing which should go next to where the normal functions are created), and within that make a file ending in .rs for unit testing.
- Make a seperate subfolder within tests for modules and for any other utility functions
- Then you can import both modules into the proper test function

**Additonal features which make unit testing in Rust much easier** 
- Instead, we should use "use *pretty_assertions::assert_eq;*", this does the same thing as assert_eq! but is "prettier formatted" with colors and easier to read.
- *Proptesting* is very useful for the fact that it can be used to test a function  many times with different, alternating values, which allow for easier testing.
- *cargo-nexttest*(cargo add cargo-nextest) increases base cargo test efficency by 3x through parallel execution. *cargo nextest run* allows for all tests to be run at the same time. *cargo nexttest list* lists all tests which are needed to be run.
- We can also use *testcontainers* in Rust (cargo add testcontainers
cargo add testcontainers-modules) which makes a setup and al    so destroys the container after automatically; meant for independant testing.
- *cargo-fuzz* is another crate meant to help with fuzz testing in Rust (finds the minimial inputs to the function which make it fail) (cargo fuzz init)
- *cargo-mutants* changes variables which would make code fail or succeed, based on what has changed.


# What we should be using
- *cargo test*, for basic testing of #[tests]
- *proptest!* for mass, automated testing and finding edge cases
- *cargo-nexttest* for upgraded base cargo test.
- *mockall* allows us to simulate the other pieces of the program which we cant connect to in live time, like the vehicle
- *cargo-tarpaulin* generates percentages and reports if needed, makes data based on the functions that were touched by the test portion.

# Rust Unit Testing Standard  for SI
- Checking if outputs are as expected, if not then throwing errors immidealty to catch quickly and debug fast
- Finding edge cases and doing mass testing on our functions/implementations using rust unit testing
- Creating subfolders for specifically testing
- Making more subfolders for modules and other utility functions
- Importing those modules and other utility functions into the main file(s)
- Proper error handling using pretty assertions, and as well overall descriptive language
- Clear cut documentation for each part of every unit test which allows for less complexity and easier usage

# Comments and Documentation for Rust End
- Use // for implementation details; lines of code or logic inside a block of code
- Use /* comment */ for multiline comments.
- Use //// for header comments, comments which are describing entire functions that proceed it.
- Use //! for commenting on a parent item (top of crate/module file often)
- Use #[test], #[ignore], #[should_panic], etc, above the function to indicate what you are testing, make sure it's well formatted.
- Explain each functions parameters, purpose, what you are testing for, and what each line does CLEARLY.

List out what cases and edge cases you will be testing. If you are refactoring, no need to list the cases, just make sure it passes existing test cases. 

Unit tests would be like testing normal and edge cases for newly introduced methods or a small part of the flow. The test file should be named after the file you are testing (yourFileTest.x) and located in a testing folder (create one if it does not exist). If applicable, you may use a testing framework. 

End to end testing would be test files that test the entire process from point A to point B. This may be cross-team, endpoints/interfaces that your subteam has with other teams, etc. Include this if applicable.