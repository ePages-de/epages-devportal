---
layout: beyond-essence
header_image: private/main.jpg
title: Workspace card
background_image: index.jpg
---
The card UI design is used on each view in the cockpit.

{% image_custom image="/assets/img/pages/essence/card-single.png" width="100" %}

The card is used to structure the content or the function semantically on each view. This helps the user to scan quickly over the content which makes it easier for him to find the function he is searching for.

The most common usage is the arrangement in a one-column layout where each card follows another.

{% image_custom image="/assets/img/pages/essence/card-row.png" width="100" %}


## Structure

A card is characterized by the following elements:

* a headline 
* and the content/functionality.
    

A card is a mandatory UI element. Each view contains at least one card. Even our empty states, logins, and dashboard content are placed on a card.

## Layout types

### One column layout - MOST COMMON

With several cards in view.

{% image_custom image="/assets/img/pages/essence/card-one-column-layout.png" width="100" %}

### One third column layout - MOST COMMON

This layout will be used to split primary content - left side, from secondary content - right side.

Only two cards are in usage to keep the focus on the left content. Use this pattern if you have a lot of information that relates to each other. If you want to give the card more structure use the line element, which splits the card into different areas.

{% image_custom image="/assets/img/pages/essence/card-one-third-column-layout.png" width="100" %}

If you have much information that is not related to each other than use several cards in each column. This helps the user to focus on one feature and it keeps the view well structured and organized.

{% image_custom image="/assets/img/pages/essence/card-one-third-column-layout-2.png" width="100" %}

### Two-column mixture layout - EXPERIENCED USAGE

Use two equal cards next to each other to show that the content on both cards has the same relevance. To ensure that both cards have the same height you also need to keep the content amount and UI the same.

This layout type should be used rarely and only in cooperation with experienced UX/UI designers.

{% image_custom image="/assets/img/pages/essence/card-two-column-layout.png" width="100" %}

### One column layout - MOST COMMON

With one card in view.

Single cards are used primarily for empty states or overviews. They don't have a card title.

{% image_custom image="/assets/img/pages/essence/card-one-column-one-card-layout.png" width="100" %}

## Card headline

A typical card starts always with a title. Define a descriptive title to summarise the content of the card. If the functionality differs a lot from each other, use another card to add your functionality. With this approach is guaranteed that the user can follow your content easily.

The font-size is set to 19.6px and is colored with our tertiary CI color.

{% image_custom image="/assets/img/pages/essence/card-title.png" width="100" %}

A card headline is a mandatory UI element with one exception:

### Overview pages and empty states

Overview pages and empty states are primarily used without any other content above or below this card. As the table is self-explanatory and described by the workspace title you can use the card without a workspace headline.

## Elements to structure the card

You can structure your content within a card with a grid, spacings, or a line element.

### Line element

If you have functionality which belongs to each other, but you need an optical separator to get a better structure and overview you can use our line element which is a simple <hr />

{% image_custom image="/assets/img/pages/essence/card-line-element.png" width="100" %}

### Spacing

Every component or content listed on the card shall get a default spacing of 30px. It is important to pre-define that spacing to keep the gap between e.g. form groups consistent in the whole cockpit.

We solved that by using a component called StackPanel which wraps components inside a card. You only need to define once the spacing and it will be applied between all listed components.

{% image_custom image="/assets/img/pages/essence/card-stack-panel.png" width="100" %}

	<StackPanel>
		<p>Lorem ipsum...</p>
		<p>Lorem ipsum...</p>
	</StackPanel> 
	// Every component listed inside the StackPanel gets a spacing between each other 
	// Use e.g. 'spacing={20}' for defining customised spacing (default -> 30px) 
	// Use e.g. 'orientation="vertical"' for columns next to each other (default -> horizontal)

A horizontal spacing and vertical spacing are needed in several places in the cockpit.
{% image_custom image="/assets/img/pages/essence/card-spacing.png" width="100" %}

### Grid

The layout you use on the card depends on your content. Some content can be used in a horizontal layout, some of them need a box layout if you need to group content within the card (e.g. App overview page). All have the commonality of responsive behavior, and a defined spacing for horizontal and vertical placed elements.

## Responsive behavior

All cards, the content inside and the cockpit itself are responsive so that the user can see all functions on wide screens > 1900px and small screens >=768px (e.g. iPad portrait format).

## Design

The card comes with a white background and rounded edges. A shadow effect behind the card increases the contrast to the beige background and helps to separate each card. Inner padding of `40px` gives enough room for content inside the card which makes the look of the card lighter and easy to scan.