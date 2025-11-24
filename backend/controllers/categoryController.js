import Category from '../models/Category.js';

// Get all categories for a user
export async function getCategories(req, res) {
  try {
    const categories = await Category.find({ userId: req.user.id }).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create new category
export async function createCategory(req, res) {
  try {
    const { name, color, icon } = req.body;
    
    const category = new Category({
      name,
      color,
      icon,
      userId: req.user.id
    });
    
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update category
export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, color, icon } = req.body;
    
    const category = await Category.findOne({ _id: id, userId: req.user.id });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    if (name) category.name = name;
    if (color) category.color = color;
    if (icon) category.icon = icon;
    
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete category
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    
    const category = await Category.findOneAndDelete({ _id: id, userId: req.user.id });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
