   M S B A M L   `   `   `  ����F  BMinesweeper, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null)clr-namespace:MinesweeperMinesweeper  5   	       Minesweeper.MainWindow   5   	   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   +localclr-namespace:Minesweeper     5   	   -   5          �Name$  
mainWindow��5   	    � Title$ 
MainWindow��5   	   $	��665��6   $
��1085��6)    � WindowStartupLocation$ CenterScreen=�66    � 
ResizeMode$ CanMinimize=�6[   .��5	      � -   5         �Name$ mainGrid��5	      .+�5
   
   �� -   5         ��Name$ 
lbBombLeft��5
      $��Bomb(s) Left:��6$   $
��Left=�6<   $��
10,599,0,0q�6W   $	��Top=�5      $��25��6(   $	��120��64   $��14(�6@   �� 5   
   -   5        $ lbTimer��5      $��Time: 0��6!   $
��Left=�63   $��130,599,0,0q�6N   $	��Top=�5      $��25��6(   $��75��64   $��14(�6?   o� 5   
   -   5         o�Name$ mainMenu��5      $��25��6!   $	��Top=�6-   $	��Top=�6E   .@�5      m� -   5         m�Name$ menuFile��5      $
��File��6)   .@�5      m� -   5        $ menuNewGame��5      $��New Game��60   6B   m� 5      -   5        $ menuExit��5      $
��Exit��6-   6;   5      m� 5      -	   5        $ menuHelp��5      $
��Help��6)   .@�5      m� -
   5        $ 	menuAbout��5      $��About��6.   6=   5      5      5      5      