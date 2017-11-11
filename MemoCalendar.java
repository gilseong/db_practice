import java.awt.*;
import java.awt.event.*;

import javax.swing.*;
import java.util.*;

public class MemoCalendar extends JFrame implements ActionListener{
	Calendar today, cal;
	int year, month, dayOfWeek, todays, memoday;
	JPanel panNorth, panWest;
	JButton btnBefore, btnAfter;
	JButton[] calBtn;
	String[] days= {"일","월","화","수","목","금","토"};
	JTextField textYear, textMonth;
	Font f;
	public MemoCalendar() {
		today = Calendar.getInstance();
		cal = new GregorianCalendar();

		year = today.get(Calendar.YEAR);
		month = today.get(Calendar.MONTH)+1;

		panNorth = new JPanel();

		panNorth.add(btnBefore = new JButton("<"));
		panNorth.add(textYear = new JTextField(year+"년"));
		panNorth.add(textMonth = new JTextField(month+"월", 3));
		panNorth.add(btnAfter = new JButton(">"));
		
		f = new Font("Sherif", Font.BOLD, 18);
		
		textYear.setEnabled(false);
		textYear.setFont(f);
		textMonth.setEnabled(false); 
		textMonth.setFont(f);
		
		add(panNorth, "North");
		
		panWest = new JPanel();
		panWest.setLayout(new GridLayout(7,7));
		add(panWest, "Center");
	
		
		btnBefore.addActionListener(this);
		btnAfter.addActionListener(this);
		
		setTitle("Calendar");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		gridInit();
		calSet();
		hideInit();
		
		setSize(500, 500);
		setVisible(true);
	}
	public void calSet() {
		cal.set(Calendar.YEAR ,year);
		cal.set(Calendar.MONTH ,(month-1));
		cal.set(Calendar.DATE ,1);
		
		dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
		
		int j = 0;
		int hopping = 0;
		calBtn[0].setForeground(new Color(255,0,0));
		calBtn[6].setForeground(new Color(0,0,255));
		
		for(int i = cal.getFirstDayOfWeek(); i<dayOfWeek; i++) { j++; }
		
		hopping = j;
		
		for(int k = 0; k<hopping; k++) {
			calBtn[k+7].setText("");
		}
		for(int i=cal.getMinimum(Calendar.DAY_OF_MONTH);
				i <= cal.getMaximum(Calendar.DAY_OF_MONTH); i++) {
			cal.set(Calendar.DATE, i);
			if(cal.get(Calendar.MONTH) != month-1) {
				break;
			}
			todays = i;
			if(memoday==1) {
				calBtn[i+6+hopping].setForeground(new Color(0,255,0));
			}
			else {
				calBtn[i+6+hopping].setForeground(new Color(0,0,0));
				if((i+hopping-1)%7==0) {
					calBtn[i+6+hopping].setForeground(new Color(255,0,0));
				}
				if((i+hopping%7==0)) {
					calBtn[i+6+hopping].setForeground(new Color(0,0,255));
				}
			}
			calBtn[i+6+hopping].setText((i)+"");
		}
	}
	public void gridInit() {
		for(int i = 0; i < days.length; i++) {
		panWest.add(calBtn[i] = new JButton(days[i]));
		calBtn[i].setContentAreaFilled(false);
		calBtn[i].setBorderPainted(false);
		}
		for(int i = days.length; i < 49; i++) {
			panWest.add(calBtn[i] = new JButton(""));
			calBtn[i].addActionListener(this);
		}
	}
	public void hideInit() {
		for(int i = 0; i < calBtn.length; i++) {
			if((calBtn[i].getText()).equals(""))
				calBtn[i].setEnabled(false);
			}
		}
	public void panelInit() {
		GridLayout gridlayout = new GridLayout(7,7);
		panWest.setLayout(gridlayout);
	}
	public void calInput(int gap) {
		month+=(gap);
		if(month<=0) {
			month = 12;
			year = year-1;
		}else if(month>=13) {
			month=1;
			year=year+1;
		}
	}
	public void actionPerformed(ActionEvent ae) {
		if(ae.getSource() == btnBefore) {
			this.panWest.removeAll();
			calInput(-1);
			gridInit();
			panelInit();
			calSet();
			hideInit();
			this.textYear.setText(year+"년");
			this.textMonth.setText(month+"월");
		}
		else if(ae.getSource() == btnAfter) {
			this.panWest.removeAll();
			calInput(1);
			gridInit();
			panelInit();
			calSet();
			hideInit();
			this.textYear.setText(year+"년");
			this.textMonth.setText(month+"월");
		}
	}
	public static void main(String[] args) {
		new MemoCalendar();
	}
}
