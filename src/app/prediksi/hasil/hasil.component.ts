import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatrixElement, MatrixController } from 'chartjs-chart-matrix';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as _ from 'lodash';

interface matrix {
  x: string;
  y: string;
  z: number;
}

@Component({
  selector: 'app-hasil',
  templateUrl: './hasil.component.html',
  styleUrls: ['./hasil.component.scss'],
})
export class HasilComponent implements OnInit, AfterViewInit {
  @Input('hasil') result: any[];
  @ViewChild('chart') ctx: ElementRef;

  chart: any;

  labels: any[] = [];
  pred: any[] = [];
  className: string[] = ['Benign', 'Malignant', 'Normal'];
  tensorLabel: tf.Tensor1D;
  tensorPred: tf.Tensor1D;
  numClasses: number;
  confusionMatrix: number[][];

  constructor() {}

  ngOnInit(): void {
    Chart.register(...registerables, MatrixController, MatrixElement);
    // console.log('input', this.result);
    if (this.result && this.result.length) {
      this.result.forEach((item) => {
        // Get true label for each image
        if (item.file_name.includes('benign')) {
          this.labels.push(0);
        } else if (item.file_name.includes('malignant')) {
          this.labels.push(1);
        } else if (item.file_name.includes('normal')) {
          this.labels.push(2);
        }
        // Get prediction result
        this.pred.push(item.prediction);
      });

      this.tensorLabel = tf.tensor1d(this.labels, 'int32');
      this.tensorPred = tf.tensor1d(this.pred, 'int32');
      this.numClasses = Math.max(...this.pred) + 1;
      const cmTensor = tf.math.confusionMatrix(
        this.tensorLabel,
        this.tensorPred,
        this.numClasses
      );
      this.confusionMatrix = cmTensor.arraySync();

      console.log('pred', this.pred);
      console.log('labels', this.labels);
      console.log('className', this.className);
      console.log('confusion matrix', this.confusionMatrix);
    }
  }

  ngAfterViewInit(): void {
    // tfvis.visor();
    // tfvis.visor().open();
    // this.confusionMatrixVisor();
    this.confusionMatrixChart();
    this.calculateCM();
  }

  confusionMatrixVisor() {
    const className = this.className.filter((str) =>
      this.numClasses === 2
        ? str !== 'Normal'
        : this.numClasses === 3
        ? str
        : false
    );
    // Render Confusion Matrix chart
    const data = {
      values: this.confusionMatrix,
      tickLabels: className,
    };
    const options = {
      xLabel: 'Prediction',
      yLabel: 'True Label',
    };
    const container = {
      name: 'Confusion Matrix',
      tab: 'Evaluation',
    };

    tfvis.render.confusionMatrix(container, data, options);
  }

  genData(className) {
    const data: matrix[] = [];
    for (let label = 0; label <= this.numClasses - 1; label++) {
      for (
        let pred = 0;
        pred <= this.confusionMatrix[label].length - 1;
        pred++
      ) {
        data.push({
          x: className[pred],
          y: className[label],
          z: this.confusionMatrix[label][pred],
        });
      }
    }
    return data;
  }

  confusionMatrixChart() {
    const className = this.className.filter((str) =>
      this.numClasses === 2
        ? str !== 'Normal'
        : this.numClasses === 3
        ? str
        : false
    );
    this.chart = new Chart(this.ctx.nativeElement, {
      type: 'matrix',
      data: {
        datasets: [
          {
            label: 'Confusion Matrix',
            data: this.genData(className),
            backgroundColor: (context) => {
              const index = context.dataIndex;
              const value = context.dataset.data[index] as any;
              const alpha = value.z / this.labels.length + 0.2;
              return `rgba(0, 255, 0, ${alpha})`;
            },
            borderColor: (context) => {
              const index = context.dataIndex;
              const value = context.dataset.data[index] as any;
              const alpha = value.z / this.labels.length + 0.2;
              return `rgba(0, 255, 0, ${alpha})`;
            },
            borderWidth: 1,
            hoverBorderColor: 'yellowgreen',
            width: ({ chart }) =>
              (chart.chartArea || {}).width / this.numClasses - 1,
            height: ({ chart }) =>
              (chart.chartArea || {}).height / this.numClasses - 1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            displayColors: false,
            callbacks: {
              title() {
                return '';
              },
              label(context) {
                const index = context.dataIndex;
                const value = context.dataset.data[index] as any;
                return ['prediction: ' + value.x, 'count: ' + value.z];
              },
            },
          },
        },
        scales: {
          y: {
            type: 'category',
            labels: className,
            reverse: false,
            offset: true,
            ticks: {
              display: true,
            },
            grid: {
              display: false,
            },
            title: {
              display: true,
              font: { size: 15, weight: 'bold' },
              text: 'True Label',
              padding: 0,
            },
          },
          x: {
            type: 'category',
            labels: className,
            offset: true,
            ticks: {
              display: true,
            },
            grid: {
              display: false,
            },
            title: {
              display: true,
              font: { size: 15, weight: 'bold' },
              text: 'Prediction',
              padding: 0,
            },
          },
        },
        layout: {
          padding: {
            top: 10,
          },
        },
      },
    });
  }

  async calculateCM() {
    if (this.numClasses === 2) {
      let tp = this.confusionMatrix[0][0];
      let fn = this.confusionMatrix[0][1];
      let fp = this.confusionMatrix[1][0];
      let tn = this.confusionMatrix[1][1];

      const precision = tp/(tp+fp);
      const recall = tp/(tp+fn);
      const specificity = tn/(tn+fp);
      const f1 = 2*tp/(2*tp+fp+fn);
      const accuracy = await tfvis.metrics.accuracy(this.tensorLabel, this.tensorPred);
      console.log('precision', precision);
      console.log('recall', recall);
      console.log('specificity', specificity);
      console.log('f1', f1);
      console.log('accuracy', accuracy);

    } else if (this.numClasses === 3) {
      const result = [
        {
          class: 'Benign',
          tp: this.confusionMatrix[0][0],
          fn: this.confusionMatrix[0][1] + this.confusionMatrix[0][2],
          fp: this.confusionMatrix[1][0] + this.confusionMatrix[2][0],
          tn: this.confusionMatrix[1][1] + this.confusionMatrix[1][2] + this.confusionMatrix[2][1] + this.confusionMatrix[2][2],
        },
        {
          class: 'Malignant',
          tp: this.confusionMatrix[1][1],
          fn: this.confusionMatrix[1][0] + this.confusionMatrix[1][2],
          fp: this.confusionMatrix[0][1] + this.confusionMatrix[2][1],
          tn: this.confusionMatrix[0][0] + this.confusionMatrix[0][2] + this.confusionMatrix[2][0] + this.confusionMatrix[2][2],
        },
        {
          class: 'Normal',
          tp: this.confusionMatrix[2][2],
          fn: this.confusionMatrix[2][0] + this.confusionMatrix[2][1],
          fp: this.confusionMatrix[0][2] + this.confusionMatrix[1][2],
          tn: this.confusionMatrix[0][0] + this.confusionMatrix[0][1] + this.confusionMatrix[1][0] + this.confusionMatrix[1][2],
        }
      ]

      const accuracy = await tfvis.metrics.accuracy(this.tensorLabel, this.tensorPred);
      console.log('accuracy 3 class', accuracy);
      console.log('result', result);
    }
  }
}
