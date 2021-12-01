use aoc_runner_derive::{aoc, aoc_generator};

#[aoc_generator(day1)]
pub fn input_generator(input: &str) -> Vec<i32> {
    input
        .lines()
        .map(|line| line.parse::<i32>().unwrap())
        .collect()
}

pub fn get_depth_count(depths: &[i32]) -> i32 {
    depths
        .iter()
        .zip(depths[1..].iter())
        .filter(|(x, y)| y > x)
        .count() as i32
}

#[aoc(day1, part1)]
pub fn solve_part1(depths: &[i32]) -> i32 {
    get_depth_count(depths)
}

#[aoc(day1, part2)]
pub fn solve_part2(depths: &[i32]) -> i32 {
    let windows: Vec<i32> = depths
        .windows(3)
        .into_iter()
        .map(|window| window.iter().sum::<i32>())
        .collect();
    get_depth_count(windows.as_slice())
}
