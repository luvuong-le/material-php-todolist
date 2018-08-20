<?php

    use PHPUnit\Framework\TestCase;

    final class ExampleTest extends TestCase {
        public function testNumbersEqual() : void {
            $this->assertEquals(2, 2);
        }
    }

?>