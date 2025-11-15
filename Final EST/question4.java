
class NumberPrinter {
    int num = 0;
    int limit = 15;

    synchronized void printEven() {
        while (num <= limit) {
            while (num % 2 != 0) {
                try { wait(); } catch (Exception e) {}
            }

            if (num <= limit) {
                System.out.println(num);
                num++;
            }
            notify();
        }
    }

    synchronized void printOdd() {
        while (num <= limit) {
            while (num % 2 == 0) {
                try { wait(); } catch (Exception e) {}
            }

            if (num <= limit) {
                System.out.println(num);
                num++;
            }
            notify();
        }
    }
}

class EvenThread extends Thread {
    NumberPrinter np;
    EvenThread(NumberPrinter np) { this.np = np; }
    public void run() {
        np.printEven();
    }
}

class OddThread extends Thread {
    NumberPrinter np;
    OddThread(NumberPrinter np) { this.np = np; }
    public void run() {
        np.printOdd();
    }
}

public class question4 {
    public static void main(String[] args) {
        NumberPrinter np = new NumberPrinter();

        EvenThread e = new EvenThread(np);
        OddThread o = new OddThread(np);

        e.start();
        o.start();
    }
}

