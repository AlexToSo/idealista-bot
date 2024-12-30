import React, { useState, useEffect } from "react";
import { db, doc, getDoc, setDoc } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";

function FiltersForm() {
    const [filters, setFilters] = useState({
        price: { min: 0, max: 0 },
        location: { city: "", radius: 0 },
        keywords: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [newKeyword, setNewKeyword] = useState(""); // Estado para agregar nuevas palabras clave

    // Cargar los valores actuales desde Firestore
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const filtersDoc = await getDoc(doc(db, "filters", "1"));
                if (filtersDoc.exists()) {
                    setFilters(filtersDoc.data());
                } else {
                    toast.warn("No se encontraron filtros. Se usarán valores por defecto.");
                }
            } catch (error) {
                toast.error("Error al cargar los filtros.");
                console.error("Error al obtener los filtros:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFilters();
    }, []);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, field] = name.split(".");

        setFilters((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: section === "price" || field === "radius" ? Number(value) : value
            }
        }));
    };

    const handleKeywordsChange = (e) => {
        setNewKeyword(e.target.value);
    };

    const addKeyword = () => {
        if (newKeyword.trim() && !filters.keywords.includes(newKeyword.trim())) {
            setFilters((prev) => ({
                ...prev,
                keywords: [...prev.keywords, newKeyword.trim()]
            }));
            setNewKeyword(""); // Limpiar campo después de agregar
        }
    };

    const removeKeyword = (keywordToRemove) => {
        setFilters((prev) => ({
            ...prev,
            keywords: prev.keywords.filter((keyword) => keyword !== keywordToRemove)
        }));
    };

    // Guardar los cambios en Firestore
    const saveFilters = async () => {
        try {
            await setDoc(doc(db, "filters", "1"), filters);
            toast.success("¡Filtros guardados correctamente!");
        } catch (error) {
            toast.error("Hubo un error al guardar los filtros.");
            console.error("Error al guardar los filtros:", error);
        }
    };

    if (isLoading) return <p>Cargando filtros...</p>;

    return (
        <Container>
            <ToastContainer />
            <h1 className="my-4">Configurar Filtros</h1>
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="priceMin">
                            <Form.Label>Precio Mínimo</Form.Label>
                            <Form.Range
                                value={filters.price.min}
                                onChange={(e) => setFilters((prev) => ({
                                    ...prev,
                                    price: { ...prev.price, min: Number(e.target.value) }
                                }))}
                                min={0}
                                max={filters.price.max}
                                step={1}
                            />
                            <Form.Control
                                type="number"
                                value={filters.price.min}
                                onChange={(e) => setFilters((prev) => ({
                                    ...prev,
                                    price: { ...prev.price, min: Number(e.target.value) }
                                }))}
                                min={0}
                                max={filters.price.max}
                                step={1}
                            />
                            <Form.Text>{filters.price.min}</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="priceMax">
                            <Form.Label>Precio Máximo</Form.Label>
                            <Form.Range
                                value={filters.price.max}
                                onChange={(e) => setFilters((prev) => ({
                                    ...prev,
                                    price: { ...prev.price, max: Number(e.target.value) }
                                }))}
                                min={filters.price.min}
                                max={500000} // Puedes ajustar este valor según sea necesario
                                step={1}
                            />
                            <Form.Control
                                type="number"
                                value={filters.price.max}
                                onChange={(e) => setFilters((prev) => ({
                                    ...prev,
                                    price: { ...prev.price, max: Number(e.target.value) }
                                }))}
                                min={filters.price.min}
                                max={500000} // Ajustar el valor máximo aquí también
                                step={1}
                            />
                            <Form.Text>{filters.price.max}</Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="locationCity" className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                        type="text"
                        name="location.city"
                        value={filters.location.city}
                        onChange={handleChange}
                        placeholder="Ingrese la ciudad"
                    />
                </Form.Group>

                <Form.Group controlId="locationRadius" className="mb-3">
                    <Form.Label>Radio (en km)</Form.Label>
                    <Form.Control
                        type="number"
                        name="location.radius"
                        value={filters.location.radius}
                        onChange={handleChange}
                        placeholder="Ingrese el radio en kilómetros"
                    />
                </Form.Group>

                <Form.Group controlId="keywords" className="mb-3">
                    <Form.Label>Palabras clave</Form.Label>
                    <Row>
                        <Col md={9}>
                            <Form.Control
                                type="text"
                                value={newKeyword}
                                onChange={handleKeywordsChange}
                                placeholder="Agregar palabra clave"
                            />
                        </Col>
                        <Col md={3}>
                            <Button variant="outline-primary" onClick={addKeyword}>
                                Añadir
                            </Button>
                        </Col>
                    </Row>
                    <ListGroup className="mt-2">
                        {filters.keywords.map((keyword, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between">
                                {keyword}
                                <Button variant="danger" size="sm" onClick={() => removeKeyword(keyword)}>
                                    Eliminar
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Form.Group>

                <Button variant="primary" onClick={saveFilters}>
                    Guardar Filtros
                </Button>
            </Form>
        </Container>
    );
}

export default FiltersForm;
