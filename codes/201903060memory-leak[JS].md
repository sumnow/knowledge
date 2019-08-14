# 内存泄漏

Low-level languages like C, have manual memory management primitives such as malloc() and free(). In contrast, JavaScript automatically allocates memory when objects are created and frees it when they are not used anymore (garbage collection). This automaticity is a potential source of confusion: it can give developers the false impression that they don't need to worry about memory management.

## Memory life cycleSection

Regardless of the programming language, memory life cycle is pretty much always the same:

1. Allocate the memory you need
2. Use the allocated memory (read, write)
3. Release the allocated memory when it is not needed anymore

The second part is explicit in all languages. The first and last parts are explicit in low-level languages but are mostly implicit in high-level languages like JavaScript.

## Garbage collection

As stated above, the general problem of automatically finding whether some memory "is not needed anymore" is undecidable. As a consequence, garbage collections implement a restriction of a solution to the general problem. This section will explain the necessary notions to understand the main garbage collection algorithms and their limitations.

### ReferencesSection

The main notion garbage collection algorithms rely on is the notion of reference. Within the context of memory management, an object is said to reference another object if the former has an access to the latter (either implicitly or explicitly). For instance, a JavaScript object has a reference to its prototype (implicit reference) and to its properties values (explicit reference).

In this context, the notion of "object" is extended to something broader than regular JavaScript objects and also contains function scopes (or the global lexical scope).

### Reference-counting garbage collectionSection

This is the most naive garbage collection algorithm. This algorithm reduces the definition of "an object is not needed anymore" to "an object has no other objects referencing it". An object is considered garbage collectible if there are zero references pointing at this object.

### Limitation: cycles

There is a limitation when it comes to cycles. In the following example, two objects are created and reference one another, thus creating a cycle. They will go out of scope after the function call, so they are effectively useless and could be freed. However, the reference-counting algorithm considers that since each of the two objects is referenced at least once, neither can be garbage-collected.

``` js
function f() {
    var o = {};
    var o2 = {};
    o.a = o2; // o references o2
    o2.a = o; // o2 references o

    return 'azerty';
}
```

``` js
f();
```

### Real-life example

Internet Explorer 6 and 7 are known to have reference-counting garbage collectors for DOM objects. Cycles are a common mistake that can generate memory leaks:

``` js
var div;
window.onload = function() {
    div = document.getElementById('myDivElement');
    div.circularReference = div;
    div.lotsOfData = new Array(10000).join('*');
};
```

In the above example, the DOM element "myDivElement" has a circular reference to itself in the "circularReference" property. If the property is not explicitly removed or nulled, a reference-counting garbage collector will always have at least one reference intact and will keep the DOM element in memory even if it was removed from the DOM tree. If the DOM element holds lots of data (illustrated in the above example with the "lotsOfData" property), the memory consumed by this data will never be released.

### Mark-and-sweep algorithmSection

This algorithm reduces the definition of "an object is not needed anymore" to "an object is unreachable".

This algorithm assumes the knowledge of a set of objects called roots (In JavaScript, the root is the global object). Periodically, the garbage-collector will start from these roots, find all objects that are referenced from these roots, then all objects referenced from these, etc. Starting from the roots, the garbage collector will thus find all reachable objects and collect all non-reachable objects.

This algorithm is better than the previous one since "an object has zero references" leads to this object being unreachable. The opposite is not true as we have seen with cycles.

As of 2012, all modern browsers ship a mark-and-sweep garbage-collector. All improvements made in the field of JavaScript garbage collection (generational/incremental/concurrent/parallel garbage collection) over the last few years are implementation improvements of this algorithm, but not improvements over the garbage collection algorithm itself nor its reduction of the definition of when "an object is not needed anymore".

### Cycles are not a problem anymore

In the first above example, after the function call returns, the 2 objects are not referenced anymore by something reachable from the global object. Consequently, they will be found unreachable by the garbage collector.

### Limitation: objects need to be made explicitly unreachable

Although this is marked as a limitation, it is one that is rarely reached in practice which is why no one usually cares that much about garbage collection.

