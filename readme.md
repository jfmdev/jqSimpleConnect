jqSimpleConnect
===============

**jqSimpleConnect** is a lightweight JavaScript library which provides the functionality for visually connect elements in a web page. 

It uses `<div>` elements to draw the connectors, in order to avoid dependencies with SVG and Canvas and in order to be more fast and simple.

His only requirement is _jQuery_, another JavaScript library, which must be included in the web page along with _jqSimpleConnect_.

Usage
-----

In order to use _jqSimpleConnect_, the only thing that you have to do is to include the JavaScript files of _jqSimpleConnect_ and _jQuery_ into your page's `<head>` tag:

```html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="jqSimpleConnect.min.js"></script>
```     

And then call the `connect` method:

```html
<div style="position:relative; height: 80px;">
    <div id="div_a" style="position:absolute; top:5px; left:5px;">Div A</div>
    <div id="div_b" style="position:absolute; top:50px; left:150px;">Div B</div>
</div>
<script type="text/javascript">
    jqSimpleConnect.connect("#div_a", "#div_b", {radius: 8, color: 'green'});
</script>
```

You can find examples in the following links:

 * [Basic examples](http://jfmdev.github.io/jqSimpleConnect/demo1.html)
 * [Advanced examples](http://jfmdev.github.io/jqSimpleConnect/demo2.html)

API Documentation
-----------------

### jqSimpleConnect.connect

Draws a connection between the elements "A" and "B".

```javascript
jqSimpleConnect.connect = function(elementA, elementB, options)
```

**Parameters**

Parameter | Description
--------- | -----------
elementA | A CSS selector or a jQuery's object for select the first element.
elementB | A CSS selector or a jQuery's object for select the second element.
options | _(optional)_ An associative array with the properties (all of them optionals):     `color` (which defines the color of the connection), `radius` (which defines the width of the connection's lines), `roundedCorners` (a boolean indicating if the corners must be round),  `anchorA` (which defines the anchor type of the first element, 'horizontal' or 'vertical') and `anchorB` (which defines the anchor type of the second element, 'horizontal' or 'vertical').

**Returns**

An string which identifies uniquely the connection.

### jqSimpleConnect.repaintConnection

Repaints an specific connection from the page.

```javascript
jqSimpleConnect.repaintConnection = function(connectionId)
```

**Parameters**

Parameter | Description
--------- | -----------
connectionId | The connection's unique identifier.

**Returns**

`true` if the connection was repainted or `false` if no connection with that identifier was found.

### jqSimpleConnect.repaintAll

Repaints all the connections in the page.

```javascript
jqSimpleConnect.repaintAll = function()
```

### jqSimpleConnect.removeConnection

Removes an specific connection from the page.

```javascript
jqSimpleConnect.removeConnection = function(connectionId)
```

**Parameters**

Parameter | Description
--------- | -----------
connectionId | The connection's unique identifier.

**Returns**

`true` if the connection was removed or `false` if no connection with that identifier was found.

### jqSimpleConnect.removeAll

Removes all the connections in the page.

```javascript
jqSimpleConnect.removeAll = function()
```

License
-------

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 3 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; If not, see <http://www.gnu.org/licenses/>.