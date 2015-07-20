/*
 * «Copyright 2012 José F. Maldonado»
 *
 *  jqSimpleConnect is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published 
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  jqSimpleConnect is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with jqSimpleConnect. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Declare namespace
 */
jqSimpleConnect = new Object();

/**
 * This member is an auxiliary counter used for generate unique identifiers.
 */
jqSimpleConnect._idGenerator = 0;

/**
 * This member is an associative array which contains all the document's connections.
 */
jqSimpleConnect._connections = new Object();

/**
 * Positions a connection, acording to the position of the elements which connects.
 * 
 * @param {object} connection A connection object.
 */
jqSimpleConnect._positionConnection = function(connection) {
    // Calculate the positions of the element's center.
    var posA = connection.elementA.offset();
    posA.left = parseInt(posA.left, 10) + parseInt(connection.elementA.outerWidth()/2, 10);
    posA.top = parseInt(posA.top, 10) + parseInt(connection.elementA.outerHeight()/2, 10);

    var posB = connection.elementB.offset();
    posB.left = parseInt(posB.left, 10) + parseInt(connection.elementB.outerWidth()/2, 10);
    posB.top = parseInt(posB.top, 10) + parseInt(connection.elementB.outerHeight()/2, 10);

    // Get the line's elements.
    var line1 = jQuery('#' + connection.id + '_1');
    var line2 = jQuery('#' + connection.id + '_2');
    var line3 = jQuery('#' + connection.id + '_3');

    // Verify if the elements are aligned in a horizontal or vertical line.
    if(posA.left == posB.left || posA.top == posB.top) {
        // Uses only one line (hide the other two).
        line1.show();
        line2.hide();
        line3.hide();

        // Verify if the line must be vertical or horizonal.
        if(posA.left == posB.left) {
            // Vertical line.
            jqSimpleConnect._positionVerticalLine(line1, posA, posB, connection.radius, connection.roundedCorners);
        } else {
            // Horizontal line.
            jqSimpleConnect._positionHorizontalLine(line1, posA, posB, connection.radius, connection.roundedCorners);
        }
    } else {
        // Verify if must use two lines or three.
        if(connection.anchorA != connection.anchorB) {
            // Use two lines (hide the third).
            line1.show();
            line2.show();
            line3.hide();
 
            // Check the anchors of the elements.
            var corner = new Object();
            if(connection.anchorA == 'vertical') {
                // Find the corner's position.
                corner.left = posA.left;
                corner.top = posB.top;
                
                // Draw lines.
                jqSimpleConnect._positionVerticalLine(line1, posA, corner, connection.radius, connection.roundedCorners);
                jqSimpleConnect._positionHorizontalLine(line2, posB, corner, connection.radius, connection.roundedCorners);
            } else {
                // Find the corner's position.
                corner.left = posB.left;
                corner.top = posA.top;
                
                // Draw lines.
                jqSimpleConnect._positionVerticalLine(line1, posB, corner, connection.radius, connection.roundedCorners);
                jqSimpleConnect._positionHorizontalLine(line2, posA, corner, connection.radius, connection.roundedCorners);
            }
        } else {
            // Use three lines.
            line1.show();
            line2.show();
            line3.show();
            
            // Declare connection points.
            var corner1 = new Object();
            var corner2 = new Object();
            
            // Find if the middle's line must be vertical o horizontal.
            if(connection.anchorA == 'vertical') {
                // Middle's line must be horizontal.
                corner1.top = parseInt((posA.top + posB.top)/2, 10);
                corner2.top = corner1.top;
                corner1.left = posA.left;
                corner2.left = posB.left;
                
                // Draw lines.
                jqSimpleConnect._positionVerticalLine(line1, posA, corner1, connection.radius, connection.roundedCorners);
                jqSimpleConnect._positionVerticalLine(line2, posB, corner2, connection.radius, connection.roundedCorners);
                jqSimpleConnect._positionHorizontalLine(line3, corner1, corner2, connection.radius, connection.roundedCorners);
            } else {
                // Middle's line must be vertical.
                corner1.left = parseInt((posA.left + posB.left)/2, 10);
                corner2.left = corner1.left;
                corner1.top = posA.top;
                corner2.top = posB.top;
                
                // Draw lines.
                jqSimpleConnect._positionHorizontalLine(line1, posA, corner1, connection.radius, connection.roundedCorners);
                jqSimpleConnect._positionHorizontalLine(line2, posB, corner2, connection.radius, connection.roundedCorners);
                jqSimpleConnect._positionVerticalLine(line3, corner1, corner2, connection.radius, connection.roundedCorners);
            }
        }
    }
}

/**
 * Draws a vertical line, between the two points, by changing the properties of a HTML element.
 *
 *@param {object} jqElement A jQuery object of the HTML element used for represent the line.
 *@param {object} point1 An object with the properties 'left' and 'top' representing the position of the first point.
 *@param {object} point2 An object with the properties 'left' and 'top' representing the position of the second point.
 *@param {integer} radius The line's radius.
 *@param {boolean} roundedCorners A boolean indicating if the corners are going to be round.
 */
jqSimpleConnect._positionVerticalLine = function(jqElement, point1, point2, radius, roundedCorners) {
    var halfRadius = parseInt(radius/2, 10);
    jqElement.css('left', point1.left - halfRadius);
    jqElement.css('top', ((point1.top > point2.top)? (point2.top - halfRadius) : (point1.top - halfRadius)));
    jqElement.css('width', radius + 'px');
    jqElement.css('height', ((point1.top > point2.top)? (point1.top - point2.top + radius) : (point2.top - point1.top + radius) ) + 'px');
}

/**
 * Draws a horizontal line, between the two points, by changing the properties of a HTML element.
 *
 *@param {object} jqElement A jQuery object of the HTML element used for represent the line.
 *@param {object} point1 An object with the properties 'left' and 'top' representing the position of the first point.
 *@param {object} point2 An object with the properties 'left' and 'top' representing the position of the second point.
 *@param {integer} radius The line's radius.
 *@param {boolean} roundedCorners A boolean indicating if the corners are going to be round.
 */
jqSimpleConnect._positionHorizontalLine = function(jqElement, point1, point2, radius, roundedCorners) {
    var halfRadius = parseInt(radius/2, 10);
    jqElement.css('top', point1.top - halfRadius);
    jqElement.css('left', ((point1.left > point2.left)? (point2.left - halfRadius) : (point1.left - halfRadius)));
    jqElement.css('height', radius + 'px');
    jqElement.css('width', ((point1.left > point2.left)? (point1.left - point2.left + radius) : (point2.left - point1.left + radius) ) + 'px');
}

/**
 * Draws a connection between two elements.
 *
 * @param {object} elementA A CSS selector or a jQuery's object for select the first element.
 * @param {object} elementB A CSS selector or a jQuery's object for select the second element.
 * @param {object} options An associative array with the properties 'color' (which defines the color of the connection), 'radius' (the width of the
 * connection), 'roundedCorners' (a boolean indicating if the corners must be round), 'anchorA' (the anchor type of the first element, which can be 
 * 'horizontal' or 'vertical') and 'anchorB' (the anchor type of second element).
 * @returns {string} The connection identifier or 'null' if the connection could not be draw.
 */
jqSimpleConnect.connect = function(elementA, elementB, options) {
    // Verify if the element's selector are ok.
    if(elementA == null || jQuery(elementA).size() == 0 ||
       elementB == null || jQuery(elementB).size() == 0) {
       return null;
       }

    elementA = jQuery(elementA);
    if(elementA.size() > 1) elementA = elementA.first();
    elementB = jQuery(elementB);
    if(elementB.size() > 1) elementB = elementB.first();

    // Create connection object.
    var connection = new Object();
    connection.id = 'jqSimpleConnect_' + jqSimpleConnect._idGenerator++;
    connection.elementA = elementA;
    connection.elementB = elementB;
    connection.color = (options != null && options.color != null)? options.color + '' : '#808080';
    connection.radius = (options != null && options.radius != null && !isNaN(options.radius))? parseInt(options.radius, 10) : 5;
    connection.anchorA = (options != null && options.anchorA != null && (options.anchorA == 'vertical' || options.anchorA == 'horizontal'))? options.anchorA : 'horizontal';
    connection.anchorB = (options != null && options.anchorB != null && (options.anchorB == 'vertical' || options.anchorB == 'horizontal'))? options.anchorB : 'horizontal';
    connection.roundedCorners = options != null && options.roundedCorners != null && (options.roundedCorners == true || options.roundedCorners == 'true');

    // Add connection to the connection's list.
    jqSimpleConnect._connections[connection.id] = connection;

    // Create HTML elements.
    var div = '<div id="divUniqueIdentifier" class="jqSimpleConnect '+connection.id+'" ' + 
              'style="width:'+connection.radius+'px; ' +
                     'height:'+connection.radius+'px; ' +
                     'background-color:'+connection.color+'; ' +
                     (connection.roundedCorners? 'border-radius:'+parseInt(connection.radius/2,10)+'px; -webkit-border-radius:'+parseInt(connection.radius/2,10)+'px; -moz-border-radius:'+parseInt(connection.radius/2,10)+'px; ' : '') + 
                     'position:absolute;"></div>';
    jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_1'));
    jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_2'));
    jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_3'));

    // Position connection.
    jqSimpleConnect._positionConnection(connection);
    
    // Return result.
    return connection.id;
}

/**
 * Repaints a connection.
 *
 * @param {string} connectionId The connection identifier.
 * @returns {boolean} 'true' if the operation was done, 'false' if the connection no exists.
 */
jqSimpleConnect.repaintConnection = function(connectionId) {
    var connection = jqSimpleConnect._connections[connectionId];
    if(connection != null) {
        jqSimpleConnect._positionConnection(connection);
        return true;
    }
    return false;
}

/**
 * Repaints all the connections.
 */
jqSimpleConnect.repaintAll = function() {
    for(var key in jqSimpleConnect._connections) {
        jqSimpleConnect._positionConnection(jqSimpleConnect._connections[key]);
    }
}

/**
 * Removes a connection.
 *
 * @param {string} connectionId The connection identifier.
 * @returns {boolean} 'true' if the operation was done, 'false' if the connection no exists.
 */
jqSimpleConnect.removeConnection = function(connectionId) {
    if(jqSimpleConnect._connections[connectionId] != null) {
        // Remove HTML element.
        jQuery('.jqSimpleConnect.'+connectionId).remove();
        
        // Remove connection data.
        jqSimpleConnect._connections[connectionId] = null;
        delete jqSimpleConnect._connections[connectionId];
        
        // Return result.
        return true;
    }
    return false;
}

/**
 * Removes all the connections.
 */
jqSimpleConnect.removeAll = function() {
    // Remove HTML elements.
    jQuery('.jqSimpleConnect').remove();
    
    // Clear connections list.
    for(var key in jqSimpleConnect._connections) {
        jqSimpleConnect._connections[key] = null;
        delete jqSimpleConnect._connections[key];
    }
}
