import java.util.HashMap;
public class Q2_labmst {
    HashMap<Integer, String> employee = new HashMap<>();
    public void addEmployee(int id, String name) {
        employee.put(id, name);
    }
    public String getEmp(int id) {
        if (employee.containsKey(id)) {
            return employee.get(id);
        } else {
            throw new RuntimeException("Employee ID " + id + " not found!");
        }
    }
    public static void main(String[] args) {
        Q2_labmst m = new Q2_labmst();

        m.addEmployee(1, "Ishan");
        m.addEmployee(2, "Priyanshu");
        m.addEmployee(3, "Rohit");
        try {
            System.out.println("Employee 2: " + m.getEmp(2));
            System.out.println("Employee 20: " + m.getEmp(20));
        } catch (RuntimeException e) {
            System.out.println("Exception: " + e.getMessage());
        }
    }
}
