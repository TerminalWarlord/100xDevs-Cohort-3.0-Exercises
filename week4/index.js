const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .name('todo cli')
    .description('Basic TODO CLI to practice NODE.JS')
    .version('0.8.0');

program.command('add')
    .description('Add a task')
    .argument('<string>', 'task to add')
    .option('-t', 'time to add')
    .action((task, options) => {
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                data = JSON.parse(data)
                data = [...data, {
                    task: task,
                }];
                console.log(data)
                fs.writeFile("task.json", JSON.stringify(data), (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log("Task has been saved!");
                })
            }
        });
    });

program.parse();