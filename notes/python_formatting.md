To have code formatting and "prettifying" on save for your Python files in **JetBrains Rider**, you can use the following approaches:

### 1. **Using a Python Formatter in Rider (on Save)**

JetBrains Rider comes with built-in support for Python code formatting. To enable automatic formatting on save:

1. **Enable Code Formatting on Save**:
   - Go to **Preferences** (macOS) or **Settings** (Windows/Linux).
   - Navigate to **Editor** → **Code Style** → **Python**.
   - Customize the Python code style rules according to your preferences.
   - In the **Editor** → **General** → **On Save**, enable **Reformat Code** to ensure Rider automatically formats files upon saving.

2. **Install Black for Python Formatting** (Optional but recommended for automatic consistency):
   - [Black](https://black.readthedocs.io/) is an opinionated Python code formatter that you can install and configure to run on save in Rider.
   - Install `black` via pip:

     ```bash
     pip install black
     ```

   - Then, configure Rider to use `black` as the Python formatter.
     - Go to **Preferences** or **Settings** → **Tools** → **File Watchers**.
     - Add a new **File Watcher** for Python files:
       - **File Type**: Python
       - **Scope**: Current File
       - **Program**: `black`
       - **Arguments**: `--line-length 88 $FilePathRelativeToProjectRoot$`
       - **Output Paths**: `$FileNameRelativeToProjectRoot$`

     With this setup, **Black** will automatically format the code whenever you save the file.

### 2. **Prettify Python Files on Git Commit**

To automatically format Python files when committing to **Git**, you can use a **pre-commit hook** with a tool like **Black** or **autopep8**. Here's how to set it up:

#### Using `pre-commit` Framework with Black

1. **Install pre-commit**:
   You need to install the `pre-commit` package to handle git hooks. Install it globally via pip:

   ```bash
   pip install pre-commit
   ```

2. **Configure pre-commit**:
   - In the root of your project, create a `.pre-commit-config.yaml` file with the following content to use **Black**:

     ```yaml
     - repo: https://github.com/psf/black
       rev: 22.3.0  # Or use the latest version
       hooks:
         - id: black
           language_version: python3
     ```

   - If you want to use **autopep8** or another formatter, you can replace the `repo` URL accordingly.

3. **Install the Hook**:
   After creating the `.pre-commit-config.yaml`, install the pre-commit hooks by running:

   ```bash
   pre-commit install
   ```

   This command installs the hooks into your `.git` directory, ensuring they run before each commit.

4. **Test Pre-commit Hook**:
   To test the pre-commit hook, simply try to make a commit. If your Python files are not formatted according to `black`, it will automatically reformat them before the commit is finalized.

   If you run `git commit`, and the files are not formatted, you’ll see the following message:

   ```bash
   Blacking the files
   ```
   
   After this, your files should be auto-formatted before the commit is accepted.

#### Other Formatter Options:

- **autopep8**: Another popular formatter for Python. You can configure it in the `.pre-commit-config.yaml` like so:

  ```yaml
  - repo: https://github.com/pre-commit/mirrors-autopep8
    rev: v1.5.7
    hooks:
      - id: autopep8
        args: ['--aggressive']
  ```

- **YAPF**: You can also use YAPF, a Python formatter from Google, by adding this to the configuration file:

  ```yaml
  - repo: https://github.com/google/yapf
    rev: v0.31.0
    hooks:
      - id: yapf
  ```

### 3. **Combining Both Approaches**

By using both:
- **On-save formatting in Rider** (for immediate feedback while coding)
- **Pre-commit hooks for Git** (to ensure consistency before committing)

You’ll have a comprehensive and automatic formatting setup for your Python files both during development and version control.

### Summary:
- **On Save**: Enable code formatting in Rider's settings or use `black` with a file watcher to format on save.
- **On Commit**: Use `pre-commit` hooks with tools like `black` or `autopep8` to automatically format Python files before committing them to Git.

This way, your code will be consistently formatted, both during development and before pushing changes to your Git repository!