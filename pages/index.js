import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="flex items-center justify-center">
        <h3 className="text-black text-4xl pt-10">Sonnet generator with pyqt6</h3>
      </div>
      <div className="flex flex-col justify-center pt-10 p-10">
        <h3 className="text-1xl">First, importing our dependencies</h3>
        <hr className="my-5" />
        <p>from PyQt6.QtWidgets import QApplication, QMainWindow, QLabel, QLineEdit, QVBoxLayout, QWidget, QPushButton</p>
        <p>import tensorflow as tf</p>
        <p>import sys</p>
        <p>from tensorflow.keras.preprocessing.sequence import pad_sequences</p>
        <p>from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout, Bidirectional</p>
        <p>from tensorflow.keras.preprocessing.text import Tokenizer</p>
        <p>from tensorflow.keras.models import Sequential</p>
        <p>from tensorflow.keras.optimizers import Adam</p>
        <p>from tensorflow.keras import regularizers</p>
        <p>import tensorflow.keras.utils as ku</p>
        <p>import numpy as np</p>
        <hr className="my-5" />
      </div>
      <div className="">
        <h3 className="text-1xl bg-gradient-to-r from-green-400 to-blue-500 px-10">
          Then, we can create a class that inherits from QMainWindow, creating the main pyqt6 window.
        </h3>
        <h3 className="text-1xl bg-gradient-to-r from-green-400 to-blue-500 px-10">
          After that, we can create a __init__ function that initializes the window once a MainWindow object is created.
        </h3>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 px-10">
          <h3 className="text-1xl bg-gradient-to-r from-green-400 to-blue-500 px-10">
            Inside the __init__ we open data, which consists of the training corpus. In order to pad input text, we have to create a tokenizer object to obtain the padding sequence length. So, we create a tokenizer and fit it to the corpus(the training corpus). Then, we create sequences of the corpus, n-gram sequences, and finally add padding to the front of sequences. After that, we load the pretrained model using tensorflow.keras.models.load_model().
          </h3>
          <h3 className="text-1xl bg-gradient-to-r from-green-400 to-blue-500 px-10">
            Now, we start setting up widgets in pyqt6. First, we set the window title. Next we need create a button, a text field, and a input field. Then, we can add these widgets to the layout. Note that we also linked the button and the input field to their corresponding functions, which we will explain later. Also note that because we are using object oriented programming, a lot of variables are set with "self".
          </h3>
          <hr className="py-5 bg-gradient-to-r from-green-400 to-blue-500 px-10" />
        </div>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 px-10">
          <p>class MainWindow(QMainWindow):</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self):</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super().__init__()</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data = open('./data/sonnets.txt').read()</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.tokenizer = Tokenizer()</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.corpus = data.lower().split("\n")</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.tokenizer.fit_on_texts(self.corpus)</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.total_words = len(self.tokenizer.word_index) + 1</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input_sequences = []</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for line in self.corpus:</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;token_list = self.tokenizer.texts_to_sequences([line])[0]</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for i in range(1, len(token_list)):</p>
                          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n_gram_sequence = token_list[:i+1]</p>
                          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input_sequences.append(n_gram_sequence)</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# pad sequences </p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.max_sequence_len = max([len(x) for x in input_sequences])</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.model = tf.keras.models.load_model("model_baseline.h5")</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.setWindowTitle("My App")</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.button = QPushButton("Press Me!")</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.button.clicked.connect(self.change_label_text)</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.label_text = "O Ray of sunshine"</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.label = QLabel()</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.label.setText("Poem generated will output here..")</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.input = QLineEdit()</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.input.textChanged.connect(self.change_input_text)</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.layout = QVBoxLayout()</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.layout.addWidget(self.input)</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.layout.addWidget(self.label)</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.layout.addWidget(self.button)</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.container = QWidget()</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.container.setLayout(self.layout)</p>

                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Set the central widget of the Window.</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.setCentralWidget(self.container)</p>
        </div>
        <hr className="px-5 py-5 bg-gradient-to-r from-green-400 to-blue-500" />
        <h3 className="py-5 bg-gradient-to-r from-green-400 to-blue-500 px-10">
          Now, we can create the change_label_text function, which will be called when the button is pressed. This function will generate a poem using the model and the input text. The input text is the first fragment of the poem(user inputted). The model will then generate the rest of the poem. The model will generate a sequence of words, and we will use the tokenizer to convert the sequence of words to a sequence of numbers. Then, we will use the tokenizer to convert the sequence of numbers to a sequence of words. Finally, we will join the sequence of words to form a poem. (This is the same process as the one used to generate the training corpus).
          P.S. This paragraph is 95% generated by github copilot.
        </h3>
        <h3 className="py-5 bg-gradient-to-r from-green-400 to-blue-500 px-10">
          Now, we can create the change_label_text function, which will be called when the button is clicked. This function will then generate the sonnet and update self.label_text
        </h3>
        <h3 className="py-5 bg-gradient-to-r from-green-400 to-blue-500 px-10">
          Now, we can create the change_input_text function, which will be called when the input field is changed. This function will set the label text to the input text.
        </h3>
        <h3 className="py-5 bg-gradient-to-r from-green-400 to-blue-500 px-10">
          Finally, we can create the main function, which will create a QApplication object and a MainWindow object. Then, we can show the window and run the application.
        </h3>
        <hr className="px-5 py-5 bg-gradient-to-r from-green-400 to-blue-500" />
          <div className="py-5 bg-gradient-to-r from-green-400 to-blue-500 px-10">
            <p>def get_sonnet(self, seed_text):</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;next_words = 30</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for _ in range(next_words):</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;token_list = self.tokenizer.texts_to_sequences([seed_text])[0]</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;token_list = pad_sequences([token_list], maxlen=self.max_sequence_len-1, padding='pre')</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;predicted = np.argmax(self.model.predict(token_list, verbose=0))</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output_word = ""</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for word, index in self.tokenizer.word_index.items():</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if index == predicted:</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output_word = word</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seed_text += " " + output_word</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return seed_text</p>

            <p>def change_label_text(self):</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text = self.get_sonnet(self.label_text)</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.label.setText(text)</p>


            <p>def change_input_text(self):</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.label_text = self.input.text()</p>


            <p>app = QApplication(sys.argv)</p>

            <p>window = MainWindow()</p>
            <p>window.show()</p>

            <p>app.exec()</p>
          </div>
      </div>
      <h3 className="py-5 bg-gradient-to-r from-green-400 to-blue-500 px-10">
        The output should look like this.
      </h3>
      <div className="py-5 bg-gradient-to-r from-green-400 to-blue-500 px-10">
        <Image 
          src="/output.jpg"
          width={800}
          height={500}
        />
      </div>
    </div>
  )
}
