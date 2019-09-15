using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private const int n = 15;
        private int[,] array = new int[n, n];
        private string player = "X";
        private string winner = "";
        private int move = 0;
        private List<int> list = new List<int>(n * n);

        public MainWindow()
        {
            InitializeComponent();
            createButton();
            newGame();
        }

        private void newGame()
        {
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < n; j++)
                    array[i, j] = -1;
            }

            foreach (var item in this.gridMain.Children)
            {
                if (item is Button)
                {
                    Button button = (Button)item;
                    button.Content = "";

                    // change to default background button color
                    button.ClearValue(Button.BackgroundProperty);
                    button.ClearValue(Button.ForegroundProperty);
                }
            }

            player = "X";
            winner = "";
            move = 0;
            list.Clear();
        }

        private void createButton()
        {
            for (int i = 0; i < n * n; i++)
            {
                Button button = new Button()
                {
                    Content = "",
                    Tag = i + 1,
                    Width = 35,
                    Height = 35,
                    FontSize = 20,
                    HorizontalAlignment = HorizontalAlignment.Left,
                    VerticalAlignment = VerticalAlignment.Top
                };

                button.Margin = new Thickness(10 + 35 * (i % n), 35 + 35 * (i / n), 0, 0);
                button.Click += new RoutedEventHandler(button_Click);
                button.MouseEnter += new MouseEventHandler(button_MouseEnter);
                button.MouseLeave += new MouseEventHandler(button_MouseLeave);
                
                this.gridMain.Children.Add(button);
            }
        }

        private void checkWinner(int row, int col, string turn)
        {
            int block = 0;
            int count_row = 0, count_col = 0, count_diag1 = 0, count_diag2 = 0, temp;

            if (turn == "X")
                temp = 1;
            else temp = 0;

            // check row
            for (int i = 0; i < n; i++)
            {
                if (array[row, i] == temp)
                    count_row++;
                else count_row = 0;

                if (count_row == 5)
                {
                    if (i < n - 1)
                    {
                        if (array[row, i + 1] != temp && array[row, i + 1] != -1)
                            block++;
                    }

                    for (int j = 0; j <= 4; j++)
                    {
                        if (array[row, i] != temp)
                            count_row--;
                        i--;
                    }

                    if (i >= 0)
                    {
                        if (array[row, i] != temp && array[row, i] != -1)
                            block++;
                    }

                    if (block == 2)
                        count_row = 0;

                    markWinLine(count_row, i, -1, row, -1, "row");
                    break;
                }
            }

            // check column
            block = 0;
            for (int i = 0; i < n; i++)
            {
                if (array[i, col] == temp)
                    count_col++;
                else count_col = 0;

                if (count_col == 5)
                {
                    if (i < n - 1)
                    {
                        if (array[i + 1, col] != temp && array[i + 1, col] != -1)
                            block++;
                    }

                    for (int j = 0; j <= 4; j++)
                    {
                        if (array[i, col] != temp)
                            count_col = 0;
                        i--;
                    }

                    if (i >= 0)
                    {
                        if (array[i, col] != temp && array[i, col] != -1)
                            block++;
                    }

                    if (block == 2)
                        count_col = 0;

                    markWinLine(count_col, i, -1, -1, col, "col");
                    break;
                }
            }

            // check the right diagnol
            block = 0;
            int x, rowTemp = row, colTemp = col;
            if (row != 0 && col != 0)
            {
                if (rowTemp > colTemp)
                {
                    rowTemp -= colTemp;
                    colTemp = 0;
                }
                else
                {
                    colTemp -= rowTemp;
                    rowTemp = 0;
                }
            }
            x = rowTemp > colTemp ? rowTemp - colTemp : colTemp - rowTemp;
            for (int i = rowTemp, j = colTemp; i < n - x || j < n - x; i++, j++)
            {
                if (array[i, j] == temp)
                    count_diag1++;
                else count_diag1 = 0;

                if (count_diag1 == 5)
                {
                    if (i < n - 1 && j < n - 1)
                    {
                        if (array[i + 1, j + 1] != temp && array[i + 1, j + 1] != -1)
                            block++;
                    }

                    for (int k = 0; k <= 4; k++)
                    {
                        if (array[i, j] != temp)
                            count_diag1 = 0;
                        i--;
                        j--;
                    }

                    if (i >= 0 && j >= 0)
                    {
                        if (array[i, j] != temp && array[i, j] != -1)
                            block++;
                    }

                    if (block == 2)
                        count_diag1 = 0;

                    markWinLine(count_diag1, i, j, 0, 0, "diag1");
                    break;
                }
            }

            // check left diagnol
            block = 0;
            rowTemp = row;
            colTemp = col;
            // check upper part and the diagnol
            if (rowTemp + colTemp <= n - 1)
            {
                rowTemp += colTemp;
                colTemp = 0;
                for (int i = rowTemp, j = colTemp; i >= 0; i--, j++)
                {
                    if (array[i, j] == temp)
                        count_diag2++;
                    else count_diag2 = 0;

                    if (count_diag2 == 5)
                    {
                        if (i > 0 && j < n - 1)
                        {
                            if (array[i - 1, j + 1] != temp && array[i - 1, j + 1] != -1)
                                block++;
                        }

                        for (int k = 0; k <= 4; k++)
                        {
                            if (array[i, j] != temp)
                                count_diag2 = 0;
                            i++;
                            j--;
                        }

                        if (i <= n - 1 && j >= 0)
                        {
                            if (array[i, j] != temp && array[i, j] != -1)
                            {
                                block++;
                            }
                        }

                        if (block == 2)
                            count_diag2 = 0;

                        markWinLine(count_diag2, i, j, -1, -1, "diag2");
                        break;
                    }
                }
            }
            else
            {
                // check the lower part
                rowTemp = n - 1;
                colTemp = row + col - n + 1;
                for (int i = rowTemp, j = colTemp; j < n; i--, j++)
                {
                    if (array[i, j] == temp)
                        count_diag2++;
                    else count_diag2 = 0;

                    if (count_diag2 == 5)
                    {
                        if (j < n - 1)
                        {
                            if (array[i - 1, j + 1] != temp && array[i - 1, j + 1] != -1)
                                block++;
                        }

                        for (int k = 0; k <= 4; k++)
                        {
                            if (array[i, j] != temp)
                                count_diag2 = 0;
                            i++;
                            j--;
                        }
                        
                        if (i <= n - 1)
                        {
                            if (array[i, j] != temp && array[i, j] != -1)
                                block++;
                        }

                        if (block == 2)
                            count_diag2 = 0;

                        markWinLine(count_diag2, i, j, -1, -1, "diag2");
                        break;
                    }
                }
            }

            if (count_row == 5 || count_col == 5 || count_diag1 == 5 || count_diag2 == 5)
            {
                winner = player;
                return;
            }
        }

        private void markWinLine(int value, int i, int j, int row, int col, string type)
        {
            // value: count_row, count_col, count_diag1, count_diag2
            if (value == 5)
            {
                if (type == "row" || type == "col")
                    i++;
                else if (row == 0 && col == 0)
                {
                    i++;
                    j++;
                }
                else
                {
                    i--;
                    j++;
                }

                for (int k = 0; k <= 4; k++)
                {
                    foreach (var item in this.gridMain.Children)
                    {
                        if (item is Button)
                        {
                            Button button = (Button)item;
                            int tag = Convert.ToInt32(button.Tag);

                            if (type == "row")
                            {
                                if (tag == row * n + 1 + i)
                                    button.Background = Brushes.Yellow;
                            }
                            else if (type == "col")
                            {
                                if (tag == i * n + 1 + col)
                                    button.Background = Brushes.Yellow;
                            }
                            else if (tag == i * n + 1 + j)
                                button.Background = Brushes.Yellow;
                        }
                    }

                    if (type == "row" || type == "col")
                        i++;
                    else if (row == 0 && col == 0)
                    {
                        i++;
                        j++;
                    }
                    else
                    {
                        i--;
                        j++;
                    }
                }
            }
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            Button button = (Button)sender;
            int i = (Convert.ToInt32(button.Tag) - 1) / n;
            int j = (Convert.ToInt32(button.Tag) - 1) % n;

            if ((button.Content as string == "" || array[i, j] == -1) && winner == "")
            {
                move++;
                list.Add(Convert.ToInt32(button.Tag));

                if (player == "X")
                {
                    button.Foreground = Brushes.Blue;
                    button.Content = player;
                    array[i, j] = 1;
                    checkWinner(i, j, player);
                    player = "O";
                }
                else
                {
                    button.Foreground = Brushes.Red;
                    button.Content = player;
                    array[i, j] = 0;
                    checkWinner(i, j, player);
                    player = "X";
                }

                // show draw or a winner and disable all the button
                if (move == n * n && winner == "")
                    MessageBox.Show("Draw!!!");
                else if (winner != "")
                    MessageBox.Show(winner + " wins");
            }
        }

        private void button_MouseEnter(object sender, MouseEventArgs e)
        {
            Button button = (Button)sender;
            if (button.Content as string == "")
            {
                if (player == "X")
                    button.Foreground = Brushes.Blue;
                else button.Foreground = Brushes.Red;

                button.Content = player;
            }
        }

        private void button_MouseLeave(object sender, MouseEventArgs e)
        {
            Button button = (Button)sender;
            int i = (Convert.ToInt32(button.Tag) - 1) / n;
            int j = (Convert.ToInt32(button.Tag) - 1) % n;

            if (button.Content as string != "" && array[i, j] == -1)
                button.Content = "";
        }

        private void menuAbout_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Thanks for playing\nThis game is made by Ho Khanh Nguyen", "Infomation");
        }

        private void menuExit_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private void menuNewGame_Click(object sender, RoutedEventArgs e)
        {
            newGame();
        }

        private void menuUndo_Click(object sender, RoutedEventArgs e)
        {
            if (list.Count == 0)
                return;

            int lastMove = list.Last();

            foreach (var item in this.gridMain.Children)
            {
                if (item is Button)
                {
                    Button button = (Button)item;
                    int tag = Convert.ToInt32(button.Tag);

                    if (tag == lastMove)
                    {
                        button.Content = "";
                        array[(tag - 1) / n, (tag - 1) % n] = -1;

                        if (player == "X")
                            player = "O";
                        else player = "X";
                    }
                }
            }

            list.RemoveAt(list.Count - 1);
        }
    }
}