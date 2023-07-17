#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <number>\n", argv[0]);
    return 1;
  }

  int number = atoi(argv[1]);
  int square = number * number;

  printf("The square of %d is %d\n", number, square);

  return 0;
}

