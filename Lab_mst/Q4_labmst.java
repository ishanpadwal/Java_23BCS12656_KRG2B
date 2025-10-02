class NumberThread extends Thread {
    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println("Number: " + i);
        }
    }
}

class SquareThread extends Thread {
    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println("Square: " + (i * i));
        }
    }
}

public class Q4_labmst {
    public static void main(String[] args) throws Exception{
        NumberThread t1 = new NumberThread();
        SquareThread t2 = new SquareThread();

        t1.start();
        t1.join();
        t2.start();
    }
}
