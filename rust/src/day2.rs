use aoc_runner_derive::{aoc, aoc_generator};
use std::str::FromStr;

pub enum Command {
    Forward(u32),
    Down(u32),
    Up(u32),
}

impl FromStr for Command {
    type Err = std::io::Error;

    fn from_str(string: &str) -> Result<Self, Self::Err> {
        let parts = string.split(" ").collect::<Vec<&str>>();
        let dist: u32 = parts[1].parse().unwrap();

        match parts[0] {
            "forward" => Ok(Command::Forward(dist)),
            "down" => Ok(Command::Down(dist)),
            "up" => Ok(Command::Up(dist)),
            _ => Err(std::io::Error::new(
                std::io::ErrorKind::InvalidInput,
                "Invalid command",
            )),
        }
    }
}

#[derive(Default)]
struct Submarine {
    depth: u32,
    horizontal: u32,
    aim: u32,
}

pub enum MODE {
    NORMAL,
    WARGAMES,
}

impl Submarine {
    fn process(&mut self, command: &Command, mode: &MODE) {
        match command {
            Command::Forward(dist) => match mode {
                MODE::NORMAL => self.horizontal += dist,
                MODE::WARGAMES => {
                    self.horizontal += dist;
                    self.depth += self.aim * dist;
                }
            },
            Command::Up(dist) => match mode {
                MODE::NORMAL => self.depth -= dist,
                MODE::WARGAMES => self.aim -= dist,
            },
            Command::Down(dist) => match mode {
                MODE::NORMAL => self.depth += dist,
                MODE::WARGAMES => self.aim += dist,
            },
        }
    }
}

#[aoc_generator(day2)]
pub fn input_generator(input: &str) -> Vec<Command> {
    input
        .lines()
        .map(|line| Command::from_str(line).unwrap())
        .collect()
}

#[aoc(day2, part1)]
pub fn solve_part1(commands: &Vec<Command>) -> u32 {
    let mut submarine = Submarine::default();

    for command in commands {
        submarine.process(command, &MODE::NORMAL);
    }

    submarine.depth * submarine.horizontal
}

#[aoc(day2, part2)]
pub fn solve_part2(commands: &Vec<Command>) -> u32 {
    let mut submarine = Submarine::default();

    for command in commands {
        submarine.process(command, &MODE::WARGAMES);
    }

    submarine.depth * submarine.horizontal
}
