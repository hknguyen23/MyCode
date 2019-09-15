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
using System.Windows.Threading;

namespace Minesweeper
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private const int n = 16;                                           // n rows
        private const int m = 30;                                           // m columns
        private int bombCount = 99;                                         // amount of bombs
        private int safeMove = n * m - 99;                                  // number safe-click to win
        private int[,] array = new int[n, m];                               // an int array to store the value of a cell
        private Button[,] buttonArray = new Button[n, m];                   // an array of n * m buttons
        private bool firstTimeButtonClick = false;                          // first click
        private int firstClickIndex = 0;                                    // first click index
        private int second = 0;                                             // time
        private DispatcherTimer dispatcherTimer = new DispatcherTimer();    // timer

        //public int N
        //{
        //    get { return n; }
        //    set { n = value; }
        //}

        //public int M
        //{
        //    get { return m; }
        //    set { m = value; }
        //}

        public MainWindow()
        {
            InitializeComponent();
            createBoard();
            newGame();
        }

        // startup and play again
        private void newGame()
        {
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < m; j++)
                {
                    array[i, j] = 0;
                    buttonArray[i, j].Content = "";
                    buttonArray[i, j].IsEnabled = true;
                    buttonArray[i, j].ClearValue(Button.BackgroundProperty);
                    buttonArray[i, j].ClearValue(Button.ForegroundProperty);
                    buttonArray[i, j].Foreground = buttonArray[i, j].Background;
                }
            }
            
            bombCount = 99;
            safeMove = n * m - 99;

            firstTimeButtonClick = false;
            firstClickIndex = 0;
            second = 0;
            this.lbBombLeft.Content = "Bomb(s) Left: " + bombCount.ToString();
        }

        // called when first click
        private void play()
        {
            randomizeBomb();
            markNumber();
        }

        // random {bombCount} bombs
        private void randomizeBomb()
        {
            for (int i = 0; i < bombCount; )
            {
                // random an integer number in [1, n * m]
                Random random = new Random();
                int index = random.Next(1, n * m + 1);
                if (array[(index - 1) / m, (index - 1) % m] != -1 && index != firstClickIndex)
                {
                    array[(index - 1) / m, (index - 1) % m] = -1;
                    i++;
                }
            }
        }

        // create field to play, button content will set with array value when clicked
        private void createBoard()
        {
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < m; j++)
                {
                    buttonArray[i, j] = new Button()
                    {
                        Tag = i * m + j + 1,
                        Width = 35,
                        Height = 35,
                        FontSize = 20,
                        HorizontalAlignment = HorizontalAlignment.Left,
                        VerticalAlignment = VerticalAlignment.Top
                    };

                    buttonArray[i, j].Foreground = buttonArray[i, j].Background;
                    buttonArray[i, j].Margin = new Thickness(10 + 35 * j, 35 + 35 * i, 0, 0);
                    buttonArray[i, j].Click += new RoutedEventHandler(button_Click);
                    buttonArray[i, j].MouseDown += new MouseButtonEventHandler(button_MouseDown);
                    this.mainGrid.Children.Add(buttonArray[i, j]);
                }
            }
        }

        // mark number around a bomb
        private void markNumber()
        {
            int count = 0;
            for (int i = 0; i < n * m; i++)
            {
                count = 0;
                if (array[i / m, i % m] != -1)
                {
                    if (i / m - 1 >= 0 && i % m - 1 >= 0)
                    {
                        if (array[i / m - 1, i % m - 1] == -1)
                            count++;
                    }

                    if (i / m - 1 >= 0)
                    {
                        if (array[i / m - 1, i % m] == -1)
                            count++;
                    }

                    if (i / m - 1 >= 0 && i % m + 1 <= m - 1)
                    {
                        if (array[i / m - 1, i % m + 1] == -1)
                            count++;
                    }

                    if (i % m - 1 >= 0)
                    {
                        if (array[i / m, i % m - 1] == -1)
                            count++;
                    }

                    if (i % m + 1 <= m - 1)
                    {
                        if (array[i / m, i % m + 1] == -1)
                            count++;
                    }

                    if (i / m + 1 <= n - 1 && i % m - 1 >= 0)
                    {
                        if (array[i / m + 1, i % m - 1] == -1)
                            count++;
                    }

                    if (i / m + 1 <= n - 1)
                    {
                        if (array[i / m + 1, i % m] == -1)
                            count++;
                    }

                    if (i / m + 1 <= n - 1 && i % m + 1 <= m - 1)
                    {
                        if (array[i / m + 1, i % m + 1] == -1)
                            count++;
                    }
                    array[i / m, i % m] = count;
                }
            }
        }

        // when button/cell clicked, show its content, if you lost, show all button/cell content
        private void revealButtonContent(int tag)
        {
            int i = (tag - 1) / m;
            int j = (tag - 1) % m;
            if (tag != 0)
            {
                if (array[i, j] == 0)
                    buttonArray[i, j].Content = "";
                else if (array[i, j] == 1)
                {
                    buttonArray[i, j].Foreground = Brushes.Blue;
                    buttonArray[i, j].Content = array[i, j];
                }
                else if (array[i, j] == 2)
                {
                    buttonArray[i, j].Foreground = Brushes.Green;
                    buttonArray[i, j].Content = array[i, j];
                }
                else if (array[i, j] == 3)
                {
                    buttonArray[i, j].Foreground = Brushes.Red;
                    buttonArray[i, j].Content = array[i, j];
                }
                else if (array[i, j] == 4)
                {
                    buttonArray[i, j].Foreground = Brushes.Purple;
                    buttonArray[i, j].Content = array[i, j];
                }
                else if (array[i, j] == 5)
                {
                    buttonArray[i, j].Foreground = Brushes.Maroon;
                    buttonArray[i, j].Content = array[i, j];
                }
                else if (array[i, j] == 6)
                {
                    buttonArray[i, j].Foreground = Brushes.Turquoise;
                    buttonArray[i, j].Content = array[i, j];
                }
                else if (array[i, j] == 7)
                {
                    buttonArray[i, j].Foreground = Brushes.Black;
                    buttonArray[i, j].Content = array[i, j];
                }
                else if (array[i, j] == 8)
                {
                    buttonArray[i, j].Foreground = Brushes.Gray;
                    buttonArray[i, j].Content = array[i, j];
                }
                buttonArray[i, j].IsEnabled = false;
                return;
            }
            else
            {
                for (i = 0; i < n; i++)
                {
                    for (j = 0; j < m; j++)
                    {
                        if (array[i, j] == 0)
                            buttonArray[i, j].Content = "";
                        else if (array[i, j] == 1)
                        {
                            buttonArray[i, j].Foreground = Brushes.Blue;
                            buttonArray[i, j].Content = array[i, j];
                        }
                        else if (array[i, j] == 2)
                        {
                            buttonArray[i, j].Foreground = Brushes.Green;
                            buttonArray[i, j].Content = array[i, j];
                        }
                        else if (array[i, j] == 3)
                        {
                            buttonArray[i, j].Foreground = Brushes.Red;
                            buttonArray[i, j].Content = array[i, j];
                        }
                        else if (array[i, j] == 4)
                        {
                            buttonArray[i, j].Foreground = Brushes.Purple;
                            buttonArray[i, j].Content = array[i, j];
                        }
                        else if (array[i, j] == 5)
                        {
                            buttonArray[i, j].Foreground = Brushes.Maroon;
                            buttonArray[i, j].Content = array[i, j];
                        }
                        else if (array[i, j] == 6)
                        {
                            buttonArray[i, j].Foreground = Brushes.Turquoise;
                            buttonArray[i, j].Content = array[i, j];
                        }
                        else if (array[i, j] == 7)
                        {
                            buttonArray[i, j].Foreground = Brushes.Black;
                            buttonArray[i, j].Content = array[i, j];
                        }
                        else if (array[i, j] == 8)
                        {
                            buttonArray[i, j].Foreground = Brushes.Gray;
                            buttonArray[i, j].Content = array[i, j];
                        }
                        else if (array[i, j] == -1)
                        {
                            buttonArray[i, j].Foreground = Brushes.DarkRed;
                            buttonArray[i, j].Content = "X";
                        }
                        buttonArray[i, j].IsEnabled = false;
                    }
                }
            }            
        }

        // when a button/cell content is "" then open 8 cells around it
        private void emptyCell(int i, int j)
        {
            if (i - 1 >= 0 && j - 1 >= 0)
            {
                if (buttonArray[i - 1, j - 1].IsEnabled)
                {
                    safeMove--;
                    revealButtonContent((i - 1) * m + (j - 1) + 1);
                    if (array[i - 1, j - 1] == 0)
                        emptyCell(i - 1, j - 1);
                }
            }

            if (i - 1 >= 0)
            {
                if (buttonArray[i - 1, j].IsEnabled)
                {
                    safeMove--;
                    revealButtonContent((i - 1) * m + j + 1);
                    if (array[i - 1, j] == 0)
                        emptyCell(i - 1, j);
                }
            }

            if (i - 1 >= 0 && j + 1 <= m - 1)
            {
                if (buttonArray[i - 1, j + 1].IsEnabled)
                {
                    safeMove--;
                    revealButtonContent((i - 1) * m + (j + 1) + 1);
                    if (array[i - 1, j + 1] == 0)
                        emptyCell(i - 1, j + 1);
                }
            }

            if (j - 1 >= 0)
            {
                if (buttonArray[i, j - 1].IsEnabled)
                {
                    safeMove--;
                    revealButtonContent(i * m + (j - 1) + 1);
                    if (array[i, j - 1] == 0)
                        emptyCell(i, j - 1);
                }
            }

            if (j + 1 <= m - 1)
            {
                if (buttonArray[i, j + 1].IsEnabled)
                {
                    safeMove--;
                    revealButtonContent(i * m + (j + 1) + 1);
                    if (array[i, j + 1] == 0)
                        emptyCell(i, j + 1);
                }
            }

            if (i + 1 <= n - 1 && j - 1 >= 0)
            {
                if (buttonArray[i + 1, j - 1].IsEnabled)
                {
                    safeMove--;
                    revealButtonContent((i + 1) * m + (j - 1) + 1);
                    if (array[i + 1, j - 1] == 0)
                        emptyCell(i + 1, j - 1);
                }
            }

            if (i + 1 <= n - 1)
            {
                if (buttonArray[i + 1, j].IsEnabled)
                {
                    safeMove--;
                    revealButtonContent((i + 1) * m + j + 1);
                    if (array[i + 1, j] == 0)
                        emptyCell(i + 1, j);
                }
            }

            if (i + 1 <= n - 1 && j + 1 <= m - 1)
            {
                if (buttonArray[i + 1, j + 1].IsEnabled)
                {
                    safeMove--;
                    revealButtonContent((i + 1) * m + (j + 1) + 1);
                    if (array[i + 1, j + 1] == 0)
                        emptyCell(i + 1, j + 1);
                }
            }
        }

        // Handle mouse left click
        private void button_Click(object sender, RoutedEventArgs e)
        {
            Button button = (Button)sender;
            if (button.Background == Brushes.Green)
                return;

            int i = (Convert.ToInt32(button.Tag) - 1) / m;
            int j = (Convert.ToInt32(button.Tag) - 1) % m;

            // if this is the first click. NOTE: first click is always safe
            if (firstTimeButtonClick == false)
            {
                firstTimeButtonClick = true;
                firstClickIndex = Convert.ToInt32(button.Tag);
                play();

                // make a timer
                dispatcherTimer.Tick += new EventHandler(dispatcherTimer_Tick);
                dispatcherTimer.Interval = new TimeSpan(0, 0, 1);
                dispatcherTimer.Start();

                if (array[i, j] == 0)
                {
                    revealButtonContent(firstClickIndex);
                    safeMove--;
                    emptyCell(i, j);
                }
                else
                {
                    revealButtonContent(firstClickIndex);
                    safeMove--;
                }

                if (safeMove == 0)
                {
                    dispatcherTimer.Stop();
                    MessageBox.Show("You won!!!", "Congratulation");
                    revealButtonContent(0);
                    return;
                }
                return;
            }

            int tag = Convert.ToInt32(button.Tag);

            // if this is not the first click
            // if you click a bomb
            if (array[i, j] == -1)
            {
                button.Foreground = Brushes.DarkRed;
                button.Content = "X";
                button.IsEnabled = false;
                dispatcherTimer.Stop();
                MessageBox.Show("Game over");
                revealButtonContent(0);
                return;
            }
            else if (array[i, j] == 0)
            {
                revealButtonContent(tag);
                button.IsEnabled = false;
                safeMove--;
                emptyCell(i, j);
            }
            else
            {
                revealButtonContent(tag);
                safeMove--;
            }

            if (safeMove == 0)
            {
                dispatcherTimer.Stop();
                MessageBox.Show("You won!!!", "Congratulation");
                revealButtonContent(0);
            }
        }

        // Handle mouse right click
        private void button_MouseDown(object sender, MouseButtonEventArgs e)
        {
            Button button = (Button)sender;
            if (e.RightButton == MouseButtonState.Pressed)
            {
                if (button.Background == Brushes.Green)
                {
                    button.ClearValue(Button.BackgroundProperty);
                    bombCount++;
                    this.lbBombLeft.Content = "Bomb(s) Left: " + bombCount.ToString();
                    return;
                }
                button.Background = Brushes.Green;
                button.Foreground = button.Background;
                bombCount--;        // there's a bug
                this.lbBombLeft.Content = "Bomb(s) Left: " + bombCount.ToString();
            }
        }

        // when About menu clicked
        private void menuAbout_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Thanks for playing\nThis game is made by Ho Khanh Nguyen", "Infomation");
        }

        // when Exit menu clicked
        private void menuExit_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        // when New Game menu clicked
        private void menuNewGame_Click(object sender, RoutedEventArgs e)
        {
            newGame();
            this.lbTimer.Content = "Time: " + second;
        }

        // every second elapsed
        private void dispatcherTimer_Tick(object sender, EventArgs e)
        {
            if (second < 999)
                second++;
            this.lbTimer.Content = "Time: " + second;
        }
    }
}