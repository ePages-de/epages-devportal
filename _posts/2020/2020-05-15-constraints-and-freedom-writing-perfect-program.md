---
layout: post
title: Constraints or freedom? Adventure to write a perfect program
date: 2020-05-15
header_image: public/coffee-writing-computer-blogging.jpg
header_position: center
header_overlay: true
category: tech-stories
tags: ["java", "programming", "python"]
authors: ["Andrey"]
about_authors: ["akhasanov"]
---

## Once upon a time
My professor once told my group it is not possible to write a perfect computer program.
Right after saying that he corrected himself, specifying that the program has to have some kind of input.

Wanting to prove our professor wrong, we suggested the program that merely takes an input of two numbers and returns their sum.
To make it easier to follow the events later, I will provide an example code in Java.

```java
import java.util.Scanner;  
  
public class Sum {  
    public static void main(String[] args) {  
        System.out.println("Enter two numbers to calculate their sum");  
        Scanner in = new Scanner(System.in);  
  
        int x = in.nextInt();  
        int y = in.nextInt();  
        int sum = x + y;  
  
        System.out.println("Sum of the numbers = " + sum);  
    }  
}
```

Read two integers from the input, calculate their sum and print the result to the output.
What could be easier?

## First obstacle
As soon as we wrote the code and ran it on our computers, we realized that there are some things that could be improved.
What if the user accidentally adds a non-digit character (such as a letter) to his number? That would immediately raise the `InputMismatchException` and our contender for the "*Easiest program since Hello World*" title would break in a blink of an eye.
Not something a perfect program should do.

Obvious solution is to not allow any characters other than the numbers.
We can't, however, proceed with that, as it will limit the user to the digit characters only.
What about the real numbers with decimal points, such as the [gravity of Earth](https://en.wikipedia.org/wiki/Gravity_of_Earth){:target="_blank"} that equals to`9.8`? This number would already break the code above, by the way, as it's not an integer and Java's `Scanner` object did not expect it.
Regardless, `9.8` is still a valid number, and we have never stated that our perfect program only works with integers, but rather with numbers in general, so we cannot let that *bring us down* (pun intended).

We could add error handling with a nice error message and use doubles instead of integers, right?

```java
import java.util.Scanner;  
  
public class Sum {  
    public static double getDouble(Scanner in) {  
        while (true) {  
            String text = in.nextLine();  
            try {  
                return Double.parseDouble(text);  
            } catch (NumberFormatException e) {  
                System.out.println("Please enter a valid real number");  
            }  
        }  
    }  
  
    public static void main(String[] args) {  
        System.out.println("Enter two real numbers to calculate their sum");  
        Scanner in = new Scanner(System.in);

        System.out.println("Please enter the first real number");
        double x = getDouble(in);  
        
        System.out.println("Please enter the second real number");
        double y = getDouble(in);  
        
        double sum = x + y;  
  
        System.out.println("Sum of the numbers = " + sum);  
    }  
}
```

## Well... Not really
We run our program and start manually testing it (we don't want to write unit tests to keep our program as small as possible, but keep in mind that this is a must if we want to make our program perfect in every way).
This gives us the following:

```
Enter two real numbers to calculate their sum
Please enter the first real number
abc
Please enter a valid real number
2.5a
Please enter a valid real number
2.5
Please enter the second real number
3
Sum of the numbers = 5.5
```

The error checking worked, the addition worked, so our program is perfect now, right? Well... not really.
How about the number precision?

```
Enter two real numbers to calculate their sum
Please enter the first real number
-2.1
Please enter the second real number
5.4
Sum of the numbers = 3.3000000000000003
```

The precision is actually working as intended, as the Java 8 [tutorial](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html){:target="_blank"} notes that *this data type should never be used for precise values*.
It suggests using `BigDecimal` objects instead.
This approach would have worked for 99.99% of cases (numbers are made up), but we were after that sweet 100% perfection.
The reason this would not be a perfect solution is a pretty curious one, as Java creates an array for every digit of your number, but that array's size is specified  by an `int`, which [itself](https://stackoverflow.com/a/6792049){:target="_blank"} has a limit of [2,147,483,647](https://en.wikipedia.org/wiki/2,147,483,647){:target="_blank"} (2<sup>31</sup> − 1).

## If you can't win the game, change the rules
Normally, we would have already given up, but proving our professor wrong was so important for us that we continued trying.
Some people (myself included) switched to Python and decided to have a constraint of only accepting integers for their program.
This could be done in the following way (with proper error handling):

```py
def getInt():
    while True:
        try:
            return int(input())
        except ValueError:
            print("Please input a valid integer")

x = getInt()
y = getInt()
print(x + y)
```

This, unfortunately, defeats the purpose of accepting all numbers by our program, but at least we don't have to worry about the precision of adding two big integers together, as Python [documentation](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex){:target="_blank"} states that *integers have unlimited precision*.

As soon as our professor saw that there is no issue with integer precision in Python, he conceded that the last program could be considered perfect until proven otherwise.
But he also pointed out that the reason this was a contender for the perfect program was exactly because of the added constraint of only allowing integers as an input.

## Constraints = Freedom (sometimes)
This made me realize that having constraints in one place might give a lot of freedom in another.
If we allowed an input of integer numbers from the start, which would be within the range of, say, -1000 and +1000, we would have spent a lot less time trying to polish the user input and more time on implementing an actual logic (which in our case was a simple addition, but in enterprise software... you get the point).

Of course, we don't only have the logical constraints, such as validations.
There are other constraints, which we, unfortunately, cannot control.
These could be of any kind, such as financial constraints, but if we were to keep this strictly technical, common constraints are the memory size and computational power.
In fact, we have already seen the memory constraint while looking at `BigDecimals` above.

Programmers constantly get frustrated by these constraints and want to *simply upgrade the machines*, because they feel that otherwise the amount of things they can do is very limited or very slow (I know I am one of them).
But, sometimes, even these constraints could act as the catalysts of progress.
For example, if computers had unlimited computational power, there would be no need to optimize software, but as this is impossible and there is always going to be a limit, there is always going to be a need for optimization, too.

To give an example, lots of games nowadays can boast huge open world maps, which you can explore any way you want, but loading the entire world into computer memory would be a waste of resources or just downright impossible.
This was an issue for many games ahead of their time, and the way those developers solved the memory problem was using [dynamic loading](https://tvtropes.org/pmwiki/pmwiki.php/Main/DynamicLoading){:target="_blank"}.
The idea is extremely simple; you only load that part of the world that the player is looking at, and a little more around that area, so that it looks natural when the user is moving their view.
As soon as the player stops looking at the previously rendered area, you destroy it.

Yes, this and many other breakthroughs happened out of a necessity, but there is no reason to deny that those constraints we are complaining about while waiting for yet another Jenkins build, are the same constraints that help drive the progress forward.
Even if only out of necessity.