package team3.promans.project;

import java.sql.Connection;
import java.sql.DriverManager;

import org.junit.Test;

public class DbTest {
	
	@Test
	public void test() {
		String info = "jdbc:oracle:thin:@106.243.194.229:9031:xe";
		
		try {
			Class.forName("oracle.jdbc.OracleDriver");
			
			Connection connection = DriverManager.getConnection(info, "ANGNAH", "1234");
			System.out.println("안녕");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
}
