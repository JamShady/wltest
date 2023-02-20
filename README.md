# Wireless Logic Software Engineering Technical Test

# How to Install & Run

From the command line, execute:
`npm install` to install the dependencies (once only), then `npm start` to execute the code.


## Initial Thoughts

Personally, I found the requirements for this test to be quite vague. The task appeared to be simple enough - especially with the right tools - but the additional requirements forced me to second guess whether there were additional requirements that were just merely being alluded to.

For example:
- Should the codebase be presented as a package that can be consumed by a 3rd party application?
- Should there be support for parameterisation, i.e. should the target URL be hard-coded or accepted as an incoming parameter, etc
- How much support should be given for changes in HTML from the target source?

Ultimately, I adopted the philosophy of approaching the task in the same way as I would for a paying customer. I'd give them what they needed, rather than specifically what they asked for where I felt with a high degree of confidence their requirements were misstated, whilst also leaving room to revert to their wishes if need be.

## Language Choice

I'm familiar with PHP and JavaScript (and NodeJS is essentially just running JavaScript via a console with some functionality). I opted for JavaScript in this instance because:
- DOM management is an inherent part of the language
- It's also much simpler to download, install and execute

I considered writing it in TypeScript, but that would have required a little additional setup and configuration, etc. This wasn't asked for, nor appeared necessary for such a small task, so I left it as not to waste time (which is the approach I would expect a customer would prefer).

## Basic Logic

The functionality is very simple, comprising of the following steps:
- Return the response from the target URL as a DOM
- For each HTML element that represents a product option:
  - Parse/extract the required data
  - Determine the annual price for each package
- For all resulting packages:
  - Sort by annual price in descending order (as per requirement)

Fortunately all of the elements were easily targettable with CSS selectors, which solidified my decision to use JavaScript and DOM querying, rather than regex parsing, etc.


## Prices

There are three ways the prices could have been represented:

#### 1: (Formatted) String
Strings are not particularly useful. They cannot be used in calculations, and needed to be parsed for the annual price calculation anyway, and would likely need to be parsed by the consumer as well if it wanted to use or display the value in another format.

#### 2: Floats
Floats would more accurately represent a decimal price, however they can be subject to rounding errors in their current format. There are ways this can be mitigated, but I also considered that this value might be passed back via JSON, which has limited variable types. It'd also still require the consumer to be aware of the issues and how to resolve them.

#### 3: Ints
In my opinion, this is the safest, most consistent and most flexible format. It doesn't suffer rounding errors and can be used safetly in calculations. It can be converted to any format for display as required by the consumer, and it's perfectly compatible with JSON output. As such, I opted to represent all prices as integers.


## Unit Tests

I chose to not write unit tests because they seemed to be unnecessary, given that the app itself is very simple at only ~50 lines of code (without trying to be conservative with space).

- The only 3rd party library is JSDOM, which has its own tests, and it would be pointless for me to implement additional tests to ensure that it parses the DOM correctly.
- The other functions are native (i.e. fetch(), etc) and ought to be presumed to work properly too, by virtue of being implemented within the platform as 1st party features.

The logic I've implemented is almost linear, without any complexity of components relying upon each other. As such, unit tests wouldn't add anything.


There were some arguments I considered in favour of writing tests:

### Unit Tests promote refactoring of code into discrete testable parts
I would agree, but this app is so basic and to the point that refactoring it isn't going to add value. The cost of refactoring would be more than any perceived value.

### Unit Tests would highlight the specific point of failure
Again, true. However, there are two things to note:

1) We know the code works in selecting the correct title, etc, because this was confirmed during the developmental process. So long as the format of the source HTML doesn't change, the code will continue to work
2) If the format changed, we would only only this upon reading and parsing it, which we should only be doing on demand anyway. We shouldn't be pro-actively reading from the source just to confirm the format hasn't changed if we don't need the up-to-date values. Thus, we will only come to know there is a change when we need the value.
3) When the format is changed, the app will stop working anyway and needs immediate attention. Unit tests is not going to give us any advance notification.
4) Since scraping relies heavily on a specific format of the source code, heavy changes will likely result in all aspects requiring to be tweaked.

In short, unit tests, **in this scenario**, don't add anything, and personally I'd be concerned if a seasoned developer spent time writing them (under the current circumstances and requirements) when that time and effort could have been better spent elsewhere.

That said, I do appreciate from a hiring perspective, there needs to be some confidence that that I know how to write tests, etc. In that stead, here are some links to other projects I've written which have full unit tests, etc, written.
- [JamShady/validator](https://github.com/JamShady/validator)
- [JamShady/hinter](https://github.com/JamShady/hinter)