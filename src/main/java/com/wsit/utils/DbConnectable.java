package com.wsit.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;



public class DbConnectable {
	
	public static Boolean getConnection(String host,String dbname,String user,String password) {
		Connection conn = null;
		try {			
			Class.forName("oracle.jdbc.OracleDriver");
			String url="jdbc:oracle:thin:@"+host+":1521:"+dbname;
			try {
				//建立连接
				conn = DriverManager.getConnection(url,user,password);
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return false;
	}


}
