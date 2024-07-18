This project was completed in a week using the provided documentation [Test_Task_Out_of_Office_solution.pdf](https://github.com/user-attachments/files/16257756/Test_Task_Out_of_Office_solution.pdf).

![image](https://github.com/user-attachments/assets/513af04f-00b0-4b86-a7e3-cd481e7506b2)
As you can see, at the top of the screen, we have a navigation bar, and in total, there are 4 interconnected tables.
You can filter data by columns, search by name/ID, and also sort data by clicking on the column headers.

![image](https://github.com/user-attachments/assets/830ea2f8-10d5-43a5-9600-6c65d719f8a0)
All create windows look roughly the same. However, I want to note that in the **create employee** window, you can select multiple **projects** using ctrl + left click.

![image](https://github.com/user-attachments/assets/325aca0f-369b-49b4-8cfb-d51cd62ace0f)
The **create approval request** window is different from the others. If you click on approve, the **status** will change in the **Approval Request list** and also in the **Leave Request list**. Additionally, the number of available **OutOfOfficeBalance** days for the employee will change depending on the number of days in the **Leave Request**.
The Reject option will simply change the status in the **Approval Request list** and also in the **Leave Request list**.

![image](https://github.com/user-attachments/assets/1883f086-d3db-47ca-a053-93fcd1256a9d)
When you select a **Leave Request** in the **Create Approval Request** window, its details are displayed in a separate window.

The project will be available live at this address: "https://35.175.229.112/" until 30.07.2024.
You can create an HR Manager and Project Manager by visiting the address: "https://35.175.229.112/newEmployee" (you can also create them manually, but for this, you need at least one HR Manager, the same applies to **Projects**).
When you create/update/delete data from the list, you need to refresh the page.
Also, employee names are unique keys, so you cannot create employees with identical names.

Additional tasks:
(1) - added filters for all tables.
(2) - added search by name/ID for all tables.
(3) - did not have enough time to correctly implement the access system.

For the backend, I used: Symfony/PHP.
For the frontend, I used: React/TypeScript.
For CSS, I used: Bootstrap.
For Database, I used: MySQL.
The project is launched on: AWS.

For any questions, you can contact me at viktor.hraboviuk@gmail.com.
